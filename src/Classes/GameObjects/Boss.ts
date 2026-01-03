import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";
import { Laser } from "./Laser.js";

export class Boss extends GameObject {
    private speed: number = 0.5;

    protected start(): void {
        // Définissez l'image du boss
        this.setImage(Assets.getBossImage());
        // Faite le apparaitre à une position aléatoire dans le canvas
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH,
            y: Math.random() * this.getGame().CANVAS_HEIGHT / 4 - 50,
        });
    }


    protected update(): void {
        // Faites avancer le boss vers le bas du Canvas
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + this.speed
        });

        // si le boss touche la Terre, la Terre perd un point de vie
        if (this.getPosition().y + this.getImage().height >= this.getGame().CANVAS_HEIGHT - 50) {
            this.getGame().loseEarthLife();

            // le boss repart du haut (il reste visible)
            this.setPosition({
                x: Math.random() * (this.getGame().CANVAS_WIDTH - this.getImage().width),
                y: -this.getImage().height
            });
        }
    }


    protected collide(other: GameObject): void {

        // Collision boss ↔ player
        if (other instanceof Player) {
            console.log("Miam Miam !");
            this.getGame().over();
        }

        // Collision missile ↔ boss
        if (other instanceof Laser) {
            // Supprimer uniquement le missile
            this.getGame().destroy(other);

            // Les vies du boss sont gérées ailleurs
        }
    }


}









