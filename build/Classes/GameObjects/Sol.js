//     const groundImg: HTMLImageElement = document.querySelector("img.sol");
//     const ground = new GameObject(
//         groundImg,
//         { x: 0, y: CANVAS_HEIGHT - groundImg.height }
//     );
//         // Dessiner le sol
//         context.drawImage(
//             ground.image,
//             ground.position.x,
//             ground.position.y,
//             ground.image.width,
//             ground.image.height
//         );
// --- Variables de jeu --- //
//     type Direction = -1 | 0 | 1;
//     let direction: Direction = 0;
//     let gameOver = false;
//     const ground = new GameObject(
//         groundImg,
//         { x: 0, y: CANVAS_HEIGHT - groundImg.height + 90 }
//         // Je ne peux déplacer comme en css il fau faire ici le -50 pour déplacer le sol
//     );
//     // Génération initiale d’aliens
//     const nbAliens = 10;
//     for (let i = 0; i < nbAliens; i++) {
//         aliens.push(new GameObject(alienImg, {
//             x: Math.random() * (CANVAS_WIDTH - alienImg.width),
//             y: Math.random() * -200
//         }));
//     }
//     // Vies de la Terre
//     let earthLives = 3;
//     //vies du joueur
//     let livesPlayer = 10;
//     // Il faut en tuer 15 pour gagner
//     let ennemiSkilledlive = 15;
