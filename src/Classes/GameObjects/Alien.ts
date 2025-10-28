// import { Assets } from "../Assets.ts";
// import { GameObject } from "./GameObject.js";

// export class Alien extends GameObject{
//     private speed : number = 1;

//     protected start(): void {
//         // Définissez l'image de l'alien
//         // Codez ici ...
//    this.setImage(Assets.getAlienImage());
//         this.setPosition({
//             x: this.getGame().CANVAS_WIDTH / 2,
//             y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
//         });

//         // Faites-le apparaître à une position aléatoire dans le canvas
//         // Codez ici ...


//     }

//     protected update(): void {
//         // Faites avancer l'alien vers le bas du Canvas
//         // Codez ici ...   
//         this.setPosition({
//             x : this.getPosition().x += this.speed*Input.getAxisX(),
//             y : this.getPosition().y
//         })
        
//     }
// }

// //// ancien code sans poo

// // Aliens
// //         for (let i = aliens.length - 1; i >= 0; i--) {
// //             const alien = aliens[i];
// //             alien.move(1); // Descente des aliens
// //             context.drawImage(
// //                 alien.image,
// //                 alien.position.x,
// //                 alien.position.y,
// //                 alien.image.width,
// //                 alien.image.height
// //             );


//   const nbAliens = 10;
// //     for (let i = 0; i < nbAliens; i++) {
// //         aliens.push(new GameObject(alienImg, {
// //             x: Math.random() * (CANVAS_WIDTH - alienImg.width),
// //             y: Math.random() * -200
// //         }));
// //     }
