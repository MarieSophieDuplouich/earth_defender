import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";

export class Laser extends GameObject {

    protected start(): void {

        //laser/ missiles position????

        this.setImage(Assets.getLaserImage());
        this.setPosition({
           x  :  0,
           y: this.getGame().CANVAS_HEIGHT - this.getImage().height + 10

        })

}

  protected update(): void {
        // Le sol est fixe, donc rien ici
    }
}

