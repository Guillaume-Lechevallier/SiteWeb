"""Tests sans envoi SMTP réel pour l'API de contact."""

import unittest
from unittest.mock import patch

from main import app


class ContactApiTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"status": "ok"})

    def test_valid_contact(self):
        payload = {
            "email": "candidat@example.com",
            "phone": "",
            "message": "Bonjour, échangeons à propos d'une alternance.",
        }
        with patch("main._send_contact_emails") as send:
            response = self.client.post("/sendmail", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"response": "Envoyé !"})
        send.assert_called_once_with(payload)

    def test_invalid_email_never_sends(self):
        with patch("main._send_contact_emails") as send:
            response = self.client.post(
                "/sendmail", json={"email": "invalid", "message": "Bonjour"}
            )
        self.assertEqual(response.status_code, 400)
        send.assert_not_called()


if __name__ == "__main__":
    unittest.main()
