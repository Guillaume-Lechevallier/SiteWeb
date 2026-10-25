# Portfolio de Guillaume Lechevallier

Portfolio Angular pré-rendu pour présenter les expériences, compétences, formations et réalisations de Guillaume Lechevallier. Le formulaire de contact utilise une API Flask hébergée avec le front derrière le même domaine.

## Développement et vérifications

```bash
npm install
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
python -m unittest discover -s APIpythonmail -p 'test_*.py'
```

Le front peut être lancé localement avec `npm start`. Pour tester le formulaire en développement, il faut aussi une route `/api/sendmail` pointant vers l'API ; le serveur de développement Angular seul ne fournit pas cette route.

## CV PDF

Le bouton « Télécharger mon CV » sert `src/assets/Guillaume-Lechevallier-CV.pdf`. Le document est généré à partir des informations publiques du site avec `tools/generate_cv.py` et ReportLab. Vérifier les dates et le contenu avant toute régénération :

```bash
python tools/generate_cv.py
```

Le résultat est un PDF A4 d'une page, avec texte sélectionnable et liens de contact.

## Déploiement sur le serveur

Le site public utilise `docker-compose.server.yml` : Nginx sert le build Angular et transmet `/api/sendmail` à Flask sur le réseau Docker interne. L'API n'expose pas directement de port public. Le proxy HTTPS existant continue de pointer vers `127.0.0.1:4300`.

1. Après validation locale, committer et pousser les sources sur Git.
2. Sur le serveur, exécuter `git pull --ff-only` dans le dépôt du portfolio.
3. Transférer le contenu de `dist/untitled/browser/` sur le serveur au même chemin : ce dossier est ignoré par Git.
4. Déposer `APIpythonmail/.env` sur le serveur sans le committer. Utiliser `.env.example` comme modèle ; `MAIL_RECIPIENT` désigne la boîte recevant les demandes.
5. Reconstruire réellement les images avec `docker compose -f docker-compose.server.yml up -d --build --force-recreate`. Une simple recréation de conteneur conserve l'ancien front.
6. Vérifier `/health`, `/api/health`, le PDF, l'affichage mobile et le formulaire depuis le domaine public.

Le mot de passe SMTP doit être un mot de passe d'application et rester hors du dépôt. En cas d'échec d'envoi, le formulaire conserve le texte saisi et propose un lien e-mail direct.

## Hébergement Firebase

`angular.json` pré-rend la route principale au build ; les fichiers statiques peuvent donc aussi être servis par Firebase Hosting. Le formulaire `/api/sendmail` dépend toutefois de l'API Flask et d'une règle de proxy compatible : un déploiement du front seul sur Firebase ne suffit pas à l'activer.
