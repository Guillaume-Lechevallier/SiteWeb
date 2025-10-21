# Portfolio de Guillaume Lechevallier

Ce dépôt contient le front-end Angular du portfolio de Guillaume Lechevallier ainsi qu'une petite API Flask dédiée à l'envoi des messages de contact. L'interface a été complètement repensée pour offrir une expérience immersive tout en conservant les contenus existants.

## Aperçu de l'interface

- Hero immersif avec navigation sticky permettant de parcourir chaque section en douceur.
- Nouvelles mises en page pour les sections « À propos », « Compétences » et « Réalisations » avec des cartes responsives.
- Section « Réalisations » enrichie du projet de détection automatique de varroas (YOLOv8, OpenCV, dataset annoté).
- Formulaires de contact et d'interaction bot modernisés pour une lecture claire.
- Palette sombre modernisée, effets de profondeur et typographie harmonisée.

## Prérequis

- Node.js 18+ et npm.
- Python 3.10+ pour l'API Flask.
- L'installation des dépendances Python nécessite un accès réseau pour récupérer les packages `Flask` et `Flask-Cors`.

## Installation & builds

```bash
# Installation des dépendances front-end
npm install

# Compilation de l'application Angular
npm run build
```

Pour la partie backend :

```bash
cd APIpythonmail
python -m venv .venv
source .venv/bin/activate  # .venv\Scripts\activate sur Windows
pip install -r requirements.txt
python main.py
```

> **Remarque :** L'environnement de travail actuel ne dispose pas d'accès réseau sortant ; l'installation de `Flask` / `Flask-Cors` ne peut donc pas être réalisée automatiquement dans ce contexte. Les instructions ci-dessus restent valables sur une machine avec un accès internet.

## Structure des projets

- `src/` : application Angular (standalone components, Angular Material).
- `APIpythonmail/` : micro-API Flask pour l'envoi d'emails, dépendances listées dans `requirements.txt`.
- `angular.json` : budgets ajustés pour refléter la nouvelle richesse visuelle.

## Scripts utiles

- `npm run build` : build de production de l'interface.
- `ng serve` : serveur de développement (non exécuté ici mais disponible).
- `python APIpythonmail/main.py` : lance l'API Flask (nécessite les dépendances Python installées).

## Déploiement

Le front est conçu pour être déployé sur Firebase Hosting. L'API Flask peut être hébergée sur un service compatible (PythonAnywhere, VM personnelle…).

