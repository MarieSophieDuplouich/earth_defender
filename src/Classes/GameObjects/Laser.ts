import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
import { Alien } from "./Alien";
import { Player } from "./Player.js";

export class Laser extends GameObject {

    protected start(): void {

        //laser/ missiles positions

        this.setImage(Assets.getLaserImage());
        this.setPosition({
            x: this.getGame().getPlayer().getPosition().x,
            y: this.getGame().getPlayer().getPosition().y - this.getImage().height

        })

    }
    protected update(): void {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - 10,
        });

        if (this.getPosition().y < 0) {
            this.getGame().destroy(this);
        }
    }

    protected collide(other: GameObject): void {
        if (other instanceof Alien) {
            this.getGame().destroy(other);
            this.getGame().destroy(this);
        }
    }
}

