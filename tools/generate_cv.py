"""Génère le CV public téléchargeable depuis le portfolio.

Les informations ci-dessous sont reprises des rubriques publiques du site.
Exécuter ce script uniquement après vérification des dates et du contenu.
"""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "assets" / "Guillaume-Lechevallier-CV.pdf"

NAVY = colors.HexColor("#10284F")
BLUE = colors.HexColor("#4053B5")
PINK = colors.HexColor("#B80E6B")
MUTED = colors.HexColor("#526783")
PALE = colors.HexColor("#F2F5FB")
RULE = colors.HexColor("#DCE4F1")


def register_fonts() -> None:
    locations = [
        (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf")),
        (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")),
    ]
    for regular, bold in locations:
        if regular.is_file() and bold.is_file():
            pdfmetrics.registerFont(TTFont("CV-Regular", str(regular)))
            pdfmetrics.registerFont(TTFont("CV-Bold", str(bold)))
            pdfmetrics.registerFontFamily("CV-Regular", normal="CV-Regular", bold="CV-Bold")
            return
    raise RuntimeError("Police Arial ou DejaVu Sans introuvable")


def paragraph_style(size: float = 9.5, leading: float = 14.5, color=MUTED, bold=False) -> ParagraphStyle:
    return ParagraphStyle(
        "cv",
        fontName="CV-Bold" if bold else "CV-Regular",
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
        allowWidows=0,
        allowOrphans=0,
    )


def draw_text(pdf: canvas.Canvas, value: str, x: float, top: float, width: float, *, size=9.5,
              leading=14.5, color=MUTED, bold=False) -> float:
    item = Paragraph(escape(value), paragraph_style(size, leading, color, bold))
    _, height = item.wrap(width, 1000)
    item.drawOn(pdf, x, top - height)
    return top - height


def section(pdf: canvas.Canvas, title: str, y: float, left: float, right: float) -> float:
    y -= 20
    pdf.setFillColor(PINK)
    pdf.setFont("CV-Bold", 9)
    pdf.drawString(left, y, title.upper())
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.7)
    pdf.line(left + 160, y - 1, right, y - 1)
    return y - 17


def entry(pdf: canvas.Canvas, title: str, period: str, description: str, y: float,
          left: float, right: float) -> float:
    pdf.setFillColor(NAVY)
    pdf.setFont("CV-Bold", 10)
    pdf.drawString(left, y, title)
    pdf.setFillColor(BLUE)
    pdf.setFont("CV-Bold", 8.5)
    pdf.drawRightString(right, y, period)
    y = draw_text(pdf, description, left, y - 8, right - left, leading=14)
    return y - 11


def build() -> None:
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("CV - Guillaume Lechevallier")
    pdf.setAuthor("Guillaume Lechevallier")
    pdf.setSubject("Développeur Full-Stack Python / Angular - alternance Master 2 SUPINFO")

    width, height = A4
    left, right = 42, width - 42
    content_width = right - left

    pdf.setFillColor(PALE)
    pdf.rect(0, height - 123, width, 123, stroke=0, fill=1)
    pdf.setFillColor(BLUE)
    pdf.rect(0, height - 123, 5, 123, stroke=0, fill=1)
    pdf.setFillColor(NAVY)
    pdf.setFont("CV-Bold", 23)
    pdf.drawString(left, height - 48, "Guillaume Lechevallier")
    pdf.setFont("CV-Bold", 11)
    pdf.drawString(left, height - 68, "Développeur Full-Stack Python / Angular | Automatisation & IA")
    pdf.setFillColor(PINK)
    pdf.setFont("CV-Bold", 9)
    pdf.drawString(left, height - 87, "Recherche d'alternance - Master 2 SUPINFO")
    pdf.setFillColor(MUTED)
    pdf.setFont("CV-Regular", 8.7)
    pdf.drawString(left, height - 107, "Caen / L'Aigle · Permis B")
    pdf.drawRightString(right, height - 107, "lechevallier-guillaume.com")

    y = height - 139
    y = draw_text(
        pdf,
        "Développeur polyvalent, actuellement chez C.A.E.N. Training et en Master 2 à SUPINFO. "
        "Je conçois, développe, déploie et maintiens des applications complètes, de l'interface aux API et à l'infrastructure. "
        "Je recherche une nouvelle entreprise d'accueil pour terminer mon alternance.",
        left, y, content_width, size=9.8, leading=15, color=NAVY,
    )

    y = section(pdf, "Expérience professionnelle", y, left, right)
    y = entry(
        pdf, "C.A.E.N. Training - Responsable informatique et roboticien", "Depuis 2024",
        "Modernisation du parc, administration du NAS, du réseau et d'équipements automatisés ; scripts PowerShell/Bash "
        "de déploiement et de mise à jour ; migration WordPress et plateformes collaboratives.",
        y, left, right,
    )
    y = entry(
        pdf, "Avem Groupe - Administrateur bureautique", "2021/2022",
        "Packaging et déploiement applicatif sur un parc de plus de 3 000 postes ; premières applications Angular "
        "et requêtes SQL.",
        y, left, right,
    )
    y = entry(
        pdf, "Watsoft Distribution - Technicien support et interne", "2019/2021",
        "Support logiciel et utilisateurs ; automatisations PowerShell/Python ; prototype de contrôle d'accès "
        "en C# avec Raspberry Pi.",
        y, left, right,
    )

    y = section(pdf, "Réalisations sélectionnées", y, left, right)
    y = entry(
        pdf, "ShopAlerte", "Full-Stack",
        "Plateforme de fidélité numérique pour commerçants : cartes Wallet, QR codes, points et gestion des rôles. "
        "Conception du front Angular, du backend Python et du déploiement Docker.",
        y, left, right,
    )
    y = entry(
        pdf, "Petit Pas", "Application web",
        "Missions et récompenses avec profils indépendants ; interface PWA mobile-first, backend Node.js/Express "
        "et base PostgreSQL.",
        y, left, right,
    )
    y = entry(
        pdf, "Ren'Py Live Translator", "Automatisation / IA",
        "Traduction locale des dialogues de jeux Ren'Py avec Python, Ollama/TranslateGemma et cache JSON.",
        y, left, right,
    )
    y = entry(
        pdf, "Détection varroas", "Intelligence artificielle",
        "Projet de comptage automatisé : préparation d'un dataset annoté et d'une chaîne d'entraînement "
        "YOLOv8 avec Python et OpenCV.",
        y, left, right,
    )

    y = section(pdf, "Compétences", y, left, right)
    y = draw_text(
        pdf,
        "Front-end : Angular, TypeScript, HTML/CSS  ·  Back-end et données : Python, Flask, Node.js, API REST, SQL, PostgreSQL  "
        "·  Automatisation : PowerShell, Bash, Python  ·  Déploiement : Docker, Linux, réseau  ·  IA et matériel : "
        "YOLO, Raspberry Pi, C#",
        left, y, content_width, size=9.2, leading=14,
    )

    y = section(pdf, "Formation", y, left, right)
    y = entry(
        pdf, "SUPINFO - Master of Engineering, option IA", "En cours",
        "Master 2 suivi à distance ; conception, développement et déploiement de solutions numériques.",
        y, left, right,
    )
    y = entry(
        pdf, "CESI - Licence Concepteur Développeur d'Applications", "2023/2024",
        "Formation suivie en architecture logicielle, DevOps et projets agiles.",
        y, left, right,
    )
    y = entry(
        pdf, "CFA Saintonge Formation - BTS SN IR", "2019/2021",
        "Formation suivie en systèmes, réseau et développement client/serveur.",
        y, left, right,
    )

    if y < 65:
        raise RuntimeError(f"Le contenu déborde de la page : y={y:.1f}")

    pdf.setStrokeColor(RULE)
    pdf.line(left, 54, right, 54)
    pdf.setFont("CV-Regular", 8.5)
    pdf.setFillColor(NAVY)
    pdf.drawString(left, 39, "moilechevallier@gmail.com")
    pdf.drawRightString(right, 39, "linkedin.com/in/guillaume-lechevallier")
    pdf.linkURL("mailto:moilechevallier@gmail.com", (left, 35, 240, 51), relative=0)
    pdf.linkURL("https://www.linkedin.com/in/guillaume-lechevallier/", (right - 220, 35, right, 51), relative=0)
    pdf.linkURL("https://lechevallier-guillaume.com/", (right - 175, height - 115, right, height - 96), relative=0)
    pdf.save()
    print(f"CV créé : {OUTPUT} ({OUTPUT.stat().st_size} octets)")


if __name__ == "__main__":
    build()
