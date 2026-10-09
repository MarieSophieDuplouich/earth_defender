import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
export class Sol extends GameObject {
    start() {
        this.setImage(Assets.getSolImage());
        // Le sol prend toute la largeur du canvas
        this.setSize(this.getGame().CANVAS_WIDTH, this.getHeight());
        this.setPosition({
            x: 0,
            y: this.getGame().CANVAS_HEIGHT - this.getHeight() + 10
        });
    }
    // Le sol est un décor : pas de collision (les aliens vérifient eux-mêmes s'ils touchent la Terre)
    isCollidable() {
        return false;
    }
}
