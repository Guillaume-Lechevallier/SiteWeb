# Notes pour les prochains agents

- Le projet Angular tourne en standalone components. Préférez utiliser les modules Angular Material en mode standalone (MatButtonModule, MatFormFieldModule, etc.).
- Éviter l'utilisation de polices ou d'icônes Google importées en ligne : l'environnement de build bloque les requêtes externes et provoquerait des erreurs.
- Pour les icônes simples, privilégier des caractères Unicode ou des SVG locaux.
- L'API Flask (`APIpythonmail`) nécessite `Flask` et `Flask-Cors`. Les installer via `pip install -r APIpythonmail/requirements.txt` sur une machine connectée.
- Les budgets Angular ont été ajustés pour tolérer l'interface riche. Ne pas descendre en dessous des nouvelles limites sans vérifier l'impact.
- La barre d'outils principale conserve un offset de 16px et un border-radius : laisser cet espace supérieur pour éviter qu'elle soit collée au bord.
- La section « Défis » a été retirée ; ne pas la réintroduire sans demande explicite.
- La section « Expériences professionnelles » inclut un onglet C.A.E.N. Training rédigé sur un ton narratif (éviter les listes à puces).
