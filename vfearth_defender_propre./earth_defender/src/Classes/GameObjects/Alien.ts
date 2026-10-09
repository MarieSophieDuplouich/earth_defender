import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";
import { Laser } from "./Laser.js";

export class Alien extends GameObject {

    private speed: number = 0.5;

    protected start(): void {
        this.setImage(Assets.getAlienImage());
        // Apparition à une position aléatoire en haut du canvas (sans dépasser sur les côtés)
        this.setPosition({
            x: Math.random() * (this.getGame().CANVAS_WIDTH - this.getWidth()),
            y: Math.random() * this.getGame().CANVAS_HEIGHT / 4 - 50
        });
    }

    protected update(): void {
        // L'alien descend
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + this.speed
        });

        // S'il touche la Terre : la Terre perd une vie et l'alien disparait
        if (this.bottom() >= this.getGame().CANVAS_HEIGHT - 50) {
            this.getGame().loseEarthLife();
            this.getGame().loseAlienLife();
            this.getGame().destroy(this);
        }
    }

    protected collide(other: GameObject): void {
        if (other instanceof Player) {
            this.getGame().losePlayerLife();
            this.getGame().destroy(this);
        }
        if (other instanceof Laser) {
            this.getGame().loseAlienLife();
            this.getGame().destroy(other);
            this.getGame().destroy(this);
        }
    }
}
