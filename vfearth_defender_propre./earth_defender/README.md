# Earth Defender

Jeu de tir en TypeScript (canvas). Défends la Terre contre 10 aliens, puis affronte le boss.

- **Niveau 1** : détruis les 10 aliens (musique du niveau).
- **Niveau 2** : le boss arrive quand tous les aliens ont disparu (musique du boss). 100 tirs pour le détruire.
- Tu perds si le joueur est touché ou si la Terre n'a plus de vie (3 vies).

## Commandes

| Touche | Action |
| --- | --- |
| Q / D (ou ← →) | se déplacer |
| Espace (maintenu) | tirer |
| P | pause |
| Entrée | rejouer (écran de fin) |

## Développer

```bash
npm install -g typescript   # une seule fois (compilateur, comme dans le cours)
tsc                         # compile src/ vers build/
tsc -w                      # recompile à chaque sauvegarde
```

Le jeu lui-même n'a **aucune dépendance** : HTML / CSS / JS pur dans le navigateur.

Ouvrir `index.html` avec un serveur local (les modules JS ne marchent pas en `file://`), par exemple
l'extension Live Server de VS Code (ou `python3 -m http.server`).

## Les collisions (grille de tiles)

Inspiré du tutoriel <https://jonathanwhiting.com/tutorial/collision/> :

1. `GameObject.overlap()` : collision entre deux rectangles (si les "x" se chevauchent ET les "y" se chevauchent).
2. `CollisionGrid` : le canvas est découpé en tiles de 100 px. Chaque objet calcule dans quelles tiles il se trouve
   (`leftTile`, `rightTile`, `topTile`, `bottomTile`) et n'est comparé qu'aux objets des mêmes tiles,
   au lieu de tous les objets du jeu.
3. Les décors (étoiles, sol) ne sont pas dans la grille : ils n'ont pas de collision.

Les "sous-étapes" du tuto ne sont pas nécessaires ici : le laser avance de 10 px par frame et le plus petit
ennemi fait 79 x 88 px, il ne peut donc pas "traverser" un ennemi.

## Mise en ligne (o2switch)

1. Dans cPanel, activer le certificat SSL (AutoSSL) du domaine.
2. `tsc`
3. Envoyer dans le dossier du site (ex. `public_html/earthdefender/`) **uniquement** :
   `index.html`, `.htaccess`, `build/`, `public/`.
   Ne pas envoyer `src/`, `node_modules/`, `package*.json`, `Dockerfile`.
4. Vérifier les en-têtes avec <https://securityheaders.com> et que `https://ton-site/src/Classes/Game.ts`
   renvoie bien une erreur 403/404.

Le `.htaccess` fournit : HTTPS forcé, pas de listing de dossiers, fichiers cachés/sources bloqués,
politique de sécurité de contenu (CSP) qui n'autorise que les fichiers du site, et cache/compression.

## Docker (test local)

```bash
tsc
docker build --tag earthdefender .
docker run -d -p 8087:80 --name earthdefender earthdefender
```
Puis ouvrir <http://localhost:8087>.

## Crédits des sons (à vérifier avant publication)

- Musique du niveau : « 8 Bit Samba » (Ian Post)
- Musique du boss : « video-game-boss-fight » (fichier 259885)
- Tir laser : « SFB sabre Laser 01 »

Vérifie la licence de chacun (attribution obligatoire ou non, usage public autorisé) avant de mettre le jeu en ligne.
