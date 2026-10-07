import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";
import { Laser } from "./Laser.js";
// export class Alien extends GameObject {


//     protected collide(other: GameObject): void {
//         // if (other instanceof Player) {
//         //     console.log("Miam Miam !")
//         //     this.getGame().over()
//         // }
//         if (other instanceof Player) {
//             this.getGame().losePlayerLife();
//             this.getGame().destroy(this);
//         }
//         // if (other instanceof Laser) {
//         //     this.getGame().destroy(other); // laser
//         //     this.getGame().destroy(this);  // alien
//         //     this.getGame().loseAlienLife();
//         // }
//         if (other instanceof Laser) {
//             this.getGame().destroy(other);
//             this.getGame().loseAlienLife();
//             this.getGame().destroy(this);
//         }

//     }
//     private speed: number = 0.5;
//     protected start(): void {
//         // Définissez l'image de l'alien
//         this.setImage(Assets.getAlienImage());
//         // Faite le apparaitre à une position aléatoire dans le canvas
//         this.setPosition({
//             x: Math.random() * this.getGame().CANVAS_WIDTH,
//             y: Math.random() * this.getGame().CANVAS_HEIGHT / 4 - 50,
//         });
//     }

//     protected update(): void {
//         // Faite avancer l'alien vers le bas du Canvas
//         this.setPosition({
//             x: this.getPosition().x,
//             y: this.getPosition().y + this.speed
//         })

//         // si un alien touche la Terre la Terre perd un point de vie  
//         if (this.getPosition().y + this.getImage().height >= this.getGame().CANVAS_HEIGHT - 50) {
//             this.getGame().loseEarthLife();
//             this.getGame().loseAlienLife();
//             this.getGame().destroy(this);   // détruire l'alien
//         }
//     }



// }

export class Alien extends GameObject {


    protected collide(other: GameObject): void {
        // if (other instanceof Player) {
        //     console.log("Miam Miam !")
        //     this.getGame().over()
        // }
        if (other instanceof Player) {
            this.getGame().losePlayerLife();
            this.getGame().destroy(this);
        }

      
        // if (other instanceof Laser) {
        //     this.getGame().destroy(other); // laser
        //     this.getGame().destroy(this);  // alien
        //     this.getGame().loseAlienLife();
        // }
        if (other instanceof Laser) {
            this.getGame().loseAlienLife(); 
           
            this.getGame().destroy(other);
            this.getGame().destroy(this);
        }
   
    }



    private speed: number = 0.5;
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
            y: this.getPosition().y + this.speed
        })


        // si un alien touche la Terre la Terre perd un point de vie  
        if (this.getPosition().y + this.getImage().height >= this.getGame().CANVAS_HEIGHT - 50) {
            this.getGame().loseEarthLife();
            this.getGame().loseAlienLife();
            this.getGame().destroy(this);   // détruire l'alien
        }
    }



}
