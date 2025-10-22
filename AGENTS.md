# Notes pour les prochains agents

- Le projet Angular tourne en standalone components. Préférez utiliser les modules Angular Material en mode standalone (MatButtonModule, MatFormFieldModule, etc.).
- Éviter l'utilisation de polices ou d'icônes Google importées en ligne : l'environnement de build bloque les requêtes externes et provoquerait des erreurs.
- Pour les icônes simples, privilégier des caractères Unicode ou des SVG locaux.
- L'API Flask (`APIpythonmail`) nécessite `Flask` et `Flask-Cors`. Les installer via `pip install -r APIpythonmail/requirements.txt` sur une machine connectée.
- Les budgets Angular ont été ajustés pour tolérer l'interface riche. Ne pas descendre en dessous des nouvelles limites sans vérifier l'impact.
- La barre d'outils principale conserve un offset de 16px et un border-radius : laisser cet espace supérieur pour éviter qu'elle soit collée au bord. Le contenu vit désormais dans `.toolbar-inner` (container centré) : respecter cette hiérarchie pour garder l'équilibre du sticky.
- Sous les 720px de large, la barre d'outils devient défilable horizontalement : préserver cette approche pour garder la navigation mobile utilisable sans menu hamburger.
- La barre d'outils repose sur une grille CSS (`brand` / `nav` / `cta`) encapsulée dans `.toolbar-inner`. Conserver ce découpage et le principe de nav scrollable.
- La barre d'outils détecte désormais les débordements : conserver la logique `navOverflow` et le panneau latéral (`mat-sidenav`) qui prend le relais en cas de trop grand nombre de liens.
- Le budget Angular `anyComponentStyle` est fixé à 8kb/14kb (warning/error) pour absorber la navigation enrichie : adapter en conséquence plutôt que de réduire brutalement les styles existants.
- Le hero s'appuie sur `.hero-shell` (`copy` / `visual`) avec la liste `.hero-points` pour les messages clés : conserver ces blocs pour garder la structure responsive et éviter les régressions.
- La section « Défis » a été retirée ; ne pas la réintroduire sans demande explicite.
- La section « Expériences professionnelles » inclut un onglet C.A.E.N. Training rédigé sur un ton narratif (éviter les listes à puces).
