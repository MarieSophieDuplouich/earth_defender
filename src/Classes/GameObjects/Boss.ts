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




////////////////////


//     // quand je tire un missile la musique s'active

//     const shootMusicsound = document.getElementById('shoot-music') as HTMLAudioElement;
//     function shootMusiques() {
//         if (shootMusicsound.paused) {
//             shootMusicsound.currentTime = 0;
//             shootMusicsound.volume = 0.5;
//             shootMusicsound.play();
//         } else {

//             shootMusicsound.currentTime = 0;
//         }

//         document.addEventListener('keydown', shootMusiques);
//     }

//     document.addEventListener("keydown", (event) => {
//         if (gameOver) return; // Bloque le contrôle après game over

//         switch (event.key) {
//             case "d":
//             case "D":
//                 direction = 1;
//                 break;
//             case "q":
//             case "Q":
//                 direction = -1;
//                 break;
//             case " ":
//                 // Tirer un missile
//                 missiles.push(new GameObject(
//                     missileImg,
//                     {
//                         x: playerPos.x + playerImg.width / 2 - missileImg.width / 2,
//                         y: playerPos.y - missileImg.height
//                     }
//                 ));
//                 shootMusiques();
//                 break;
//         }
//     });