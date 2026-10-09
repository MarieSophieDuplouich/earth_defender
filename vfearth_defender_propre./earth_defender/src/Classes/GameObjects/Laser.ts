import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";

export class Laser extends GameObject {

    private speed: number = 10;

    protected start(): void {
        this.setImage(Assets.getLaserImage());
        // Le laser part du milieu du joueur
        const player = this.getGame().getPlayer();
        this.setPosition({
            x: player.getPosition().x + player.getWidth() / 2 - this.getWidth() / 2,
            y: player.getPosition().y - this.getHeight()
        });
    }

    protected update(): void {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - this.speed
        });

        // Sorti par le haut de l'écran
        if (this.bottom() < 0) {
            this.getGame().destroy(this);
        }
    }
}
