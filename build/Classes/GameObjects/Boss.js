//     // --- Boucle de jeu --- //
//     setInterval(() => {
//         // Sol
//         context.drawImage(
//             ground.image,
//             ground.position.x,
//             ground.position.y,
//             ground.image.width,
//             ground.image.height
//         );
//             );
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
//         // Affichage des vies ("10 ❤️")
//         context.fillStyle = "white";
//         context.font = "24px Arial";
//         context.textAlign = "center";
//         context.fillText(`${livesPlayer} ❤️`, CANVAS_WIDTH / 2, ground.position.y - 20);
//         // Affichage des 3 vies de  la Terre ("3 🌍")
//         context.fillStyle = "white";
//         context.font = "24px Arial";
//         context.textAlign = "right";
//         context.fillText(`${earthLives} 🌍`, 340, 430);
//              // ennemis killed lives position
//             //Si 15 ennemis  tués le joueur passe devant le boss ça après
//         // context.drawImage(
//         //     ennemiKilled.image,
//         //     ennemiKilled.position.x,
//         //     ennemiKilled.position.y,
//         //     ennemiKilled.image.width,
//         //     ennemiKilled.image.height
//         // );
//         // Affichage des 15 vies des aliens ("15 👽 ")
//         context.fillStyle = "white";
//         context.font = "24px Arial";
//         context.textAlign = "right";
//         context.fillText(`${ennemiSkilledlive} ennemiKilled`, 100, 70);
