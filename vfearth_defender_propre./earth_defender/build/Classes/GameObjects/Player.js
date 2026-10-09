import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Input } from "../Input.js";
import { Laser } from "./Laser.js";
import { Music } from "../Music.js";
// Délai minimum entre deux tirs : 200 ms (cahier des charges), soit 20 frames de 10 ms
const COOLDOWN_TIR = 20;
export class Player extends GameObject {
    constructor() {
        super(...arguments);
        this.speed = 10;
        this.cooldown = 0;
    }
    start() {
        this.setImage(Assets.getPlayerImage());
        // En bas au centre du canvas, à 10px du bord
        this.setPosition({
            x: (this.getGame().CANVAS_WIDTH - this.getWidth()) / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getHeight() - 10
        });
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (Input.getIsShooting() && this.cooldown === 0) {
            this.getGame().instanciate(new Laser(this.getGame()));
            Music.playLaser();
            this.cooldown = COOLDOWN_TIR;
        }
        // Déplacement horizontal, bloqué par les bords du canvas
        // (comme dans le tuto : on traite l'axe x tout seul, on n'a pas besoin d'autre chose ici)
        const newX = this.getPosition().x + this.speed * Input.getAxisX();
        const maxX = this.getGame().CANVAS_WIDTH - this.getWidth();
        this.setPosition({
            x: Math.max(0, Math.min(maxX, newX)),
            y: this.getPosition().y
        });
    }
}
