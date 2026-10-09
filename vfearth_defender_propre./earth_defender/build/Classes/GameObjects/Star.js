import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
export class Star extends GameObject {
    start() {
        this.setImage(Assets.getStarImage());
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH,
            y: Math.random() * this.getGame().CANVAS_HEIGHT - 10
        });
    }
    update() {
        // Le décor étoilé descend lentement (0.1 px par frame)
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + 0.1
        });
        // Arrivée en bas : l'étoile repart du haut
        if (this.getPosition().y > this.getGame().CANVAS_HEIGHT) {
            this.setPosition({
                x: this.getPosition().x,
                y: 0
            });
        }
    }
    // Décor : pas de collision
    isCollidable() {
        return false;
    }
}
