"""API Flask du formulaire de contact du portfolio.

Les paramètres SMTP sont fournis par variables d'environnement. Aucun secret ne
doit être enregistré dans le dépôt.
"""

from __future__ import annotations

import base64
import binascii
import html
import logging
import os
import re
import smtplib
from email.message import EmailMessage
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/sendmail": {"origins": "*"}})

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
MAX_MESSAGE_LENGTH = 10_000


def _setting(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def _decode_message(value: str) -> str:
    """Accepte le format base64 historique et le texte normal."""
    if not value:
        return ""
    try:
        return base64.b64decode(value, validate=True).decode("utf-8").strip()
    except (binascii.Error, UnicodeDecodeError):
        return value.strip()


def _payload() -> dict[str, str]:
    """Lit le nouveau JSON et conserve la compatibilité avec l'ancien frontend."""
    data: dict[str, Any] = request.get_json(silent=True) or {}
    if not data:
        data = {
            "email": request.headers.get("mail", ""),
            "phone": request.headers.get("phone", ""),
            "message": _decode_message(request.headers.get("contenu", "")),
        }
        message = str(data.get("message", ""))
    else:
        message = str(data.get("message", data.get("contenu", "")))
    return {
        "email": str(data.get("email", data.get("mail", ""))).strip(),
        "phone": str(data.get("phone", "")).strip(),
        "message": message.strip(),
    }


def _validate(payload: dict[str, str]) -> str | None:
    if not payload["email"]:
        return "Renseignez une adresse e-mail."
    if not EMAIL_RE.fullmatch(payload["email"]):
        return "Adresse e-mail non valide."
    if not payload["message"]:
        return "Renseignez un message."
    if len(payload["message"]) > MAX_MESSAGE_LENGTH:
        return "Le message est trop long."
    return None


def _smtp_config() -> dict[str, str | int]:
    return {
        "host": _setting("SMTP_HOST", "smtp.gmail.com"),
        "port": int(_setting("SMTP_PORT", "587")),
        "username": _setting("SMTP_USERNAME"),
        "password": os.getenv("SMTP_PASSWORD", ""),
        "sender": _setting("MAIL_SENDER") or _setting("SMTP_USERNAME"),
        "recipient": _setting("MAIL_RECIPIENT"),
    }


def _send_email(to: str, subject: str, text: str, html_body: str) -> None:
    config = _smtp_config()
    missing = [
        name
        for name in ("username", "password", "sender", "recipient")
        if not config[name]
    ]
    if missing:
        raise RuntimeError("Configuration SMTP incomplète : " + ", ".join(missing))

    message = EmailMessage()
    message["From"] = str(config["sender"])
    message["To"] = to
    message["Subject"] = subject
    message.set_content(text)
    message.add_alternative(html_body, subtype="html")

    with smtplib.SMTP(str(config["host"]), int(config["port"]), timeout=20) as smtp:
        smtp.starttls()
        smtp.login(str(config["username"]), str(config["password"]))
        smtp.send_message(message)


def _send_contact_emails(payload: dict[str, str]) -> None:
    email = html.escape(payload["email"])
    phone = html.escape(payload["phone"] or "Non renseigné")
    message = html.escape(payload["message"]).replace("\n", "<br>")
    recipient = _smtp_config()["recipient"]

    owner_html = (
        "<h2>Bonjour Guillaume !</h2>"
        f"<p><strong>Adresse :</strong> {email}</p>"
        f"<p><strong>Téléphone :</strong> {phone}</p>"
        f"<p><strong>Message :</strong><br>{message}</p>"
    )
    _send_email(
        str(recipient),
        "Nouveau message depuis le portfolio",
        f"Adresse : {payload['email']}\nTéléphone : {payload['phone']}\n\n{payload['message']}",
        owner_html,
    )

    confirmation_html = (
        "<p>Bonjour,</p>"
        "<p>J'ai bien reçu votre demande et je vous remercie pour votre message.</p>"
        f"<p>Votre numéro de téléphone : <strong>{phone}</strong></p>"
        "<p>Je reviendrai vers vous au plus vite.</p>"
        "<p>Bonne journée !<br><br>Guillaume Lechevallier</p>"
    )
    _send_email(
        payload["email"],
        "J'ai bien reçu votre demande",
        "J'ai bien reçu votre demande. Je reviendrai vers vous au plus vite.",
        confirmation_html,
    )


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/sendmail", methods=["GET", "POST", "OPTIONS"])
def sendmail():
    if request.method == "OPTIONS":
        return ("", 204)

    payload = _payload()
    error = _validate(payload)
    if error:
        return jsonify({"response": error}), 400

    try:
        _send_contact_emails(payload)
    except Exception:
        logger.exception("Échec de l'envoi du formulaire de contact")
        return jsonify({"response": "Le message n'a pas pu être envoyé."}), 502

    return jsonify({"response": "Envoyé !"})


if __name__ == "__main__":
    app.run(
        host=_setting("FLASK_HOST", "127.0.0.1"),
        port=int(_setting("FLASK_PORT", "5000")),
        debug=_setting("FLASK_DEBUG", "0") == "1",
    )
