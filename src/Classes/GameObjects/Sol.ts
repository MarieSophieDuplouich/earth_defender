import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";

export class Sol extends GameObject {

    protected start(): void {

        //sol le positionner dans le canva

        this.setImage(Assets.getSolImage());
        this.setPosition({
           x  :  0,
           y: this.getGame().CANVAS_HEIGHT - this.getImage().height + 10

        })

}

  protected update(): void {
        // Le sol est fixe, donc rien ici
    }
}






