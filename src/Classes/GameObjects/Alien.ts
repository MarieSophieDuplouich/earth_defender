import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";

export class Alien extends GameObject {
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

    protected collide(other: GameObject): void {
        if (other instanceof Player) {
            console.log("Miam Miam !")
            this.getGame().over()
        }
    

    }
    private speed: number = 2;
    protected start(): void {
        // Définissez l'image de l'alien
        this.setImage(Assets.getAlienImage());
        // Faite le apparaitre à une position aléatoire dans le canvas
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH,
            y: Math.random() * this.getGame().CANVAS_HEIGHT / 4 - 50,
        });
    }

    protected update(): void {
        // Faite avancer l'alien vers le bas du Canvas
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y += this.speed
        })

            // si un alien touche la Terre la Terre perd un point de vie  
        if (this.getPosition().y + this.getImage().height >= this.getGame().CANVAS_HEIGHT - 50) {
            this.getGame().loseEarthLife(); 
            this.getGame().destroy(this);   // détruire l'alien
        }
    }



}

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
