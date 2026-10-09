import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";

// Projectile tiré par le boss : il descend vers le joueur
export class BossLaser extends GameObject {

    private speed: number = 4;

    protected start(): void {
        this.setImage(Assets.getBossLaserImage());
        // La position est donnée par le boss au moment du tir
    }

    protected update(): void {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + this.speed
        });

        // Sorti par le bas de l'écran
        if (this.top() > this.getGame().CANVAS_HEIGHT) {
            this.getGame().destroy(this);
        }
    }

    protected collide(other: GameObject): void {
        if (other instanceof Player) {
            this.getGame().destroy(this);
            this.getGame().losePlayerLife();
        }
    }
}
