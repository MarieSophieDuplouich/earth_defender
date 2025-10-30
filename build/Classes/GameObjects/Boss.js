// choses restantes à faire
//Mort du joueur	Le joueur meurt si un alien le touche.	Le jeu recommence.
//Tir du joueur	Le joueur tire des missiles qui détruisent un alien au contact	Les missiles vont tout droit vers le haut de l'écran. 
// La touche espace tire un missile. Le joueur peut tirer à une cadence maximale de 200 ms.
//Bonus SON Joueur	Émettre un son au tir du joueur.
//             // Collision alien ↔ sol
//             if (alien.position.y + alien.image.height >= ground.position.y) {
//                 earthLives = Math.max(0, earthLives - 1);
//                 alien.position.y = -alien.image.height;
//                 alien.position.x = Math.random() * (CANVAS_WIDTH - alien.image.width);
//             }
//             // Collision missile ↔ alien
//             for (let j = missiles.length - 1; j >= 0; j--) {
//                 const missile = missiles[j];
//                 if (isColliding(missile, alien)) {
//                     // Supprimer le missile et l’alien touché
//                     missiles.splice(j, 1);
//                     aliens.splice(i, 1);
//                     // Recréer un nouvel alien
//                     aliens.push(new GameObject(alienImg, {
//                         x: Math.random() * (CANVAS_WIDTH - alienImg.width),
//                         y: -alienImg.height
//                     }));
//                     break;
//                 }
//             }
//         }
