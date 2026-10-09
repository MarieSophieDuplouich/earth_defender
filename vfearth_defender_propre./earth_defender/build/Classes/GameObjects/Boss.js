import { GameObject } from "./GameObject.js";
import { BossLaser } from "./BossLaser.js";
import { Assets } from "../Assets.js";
import { Player } from "./Player.js";
import { Laser } from "./Laser.js";
// Largeur du boss à l'écran (l'image fait 360px, donc nette même sur écran HD)
const LARGEUR_BOSS = 180;
// Arrivée : le boss descend tout droit jusqu'à sa hauteur de combat, puis ne descend plus
const VITESSE_ENTREE = 1;
const Y_COMBAT = 50;
// Ondulation (1 frame = 10 ms)
const AMPLITUDE_X = 300; // il balaie l'écran de gauche à droite sur +/- 300 px
const PERIODE_X = 500; // un aller-retour complet = 500 frames (5 secondes)
const AMPLITUDE_Y = 25; // petit mouvement de haut en bas en plus
const PERIODE_Y = 300;
// Tirs : un projectile toutes les 0,7 à 1,1 seconde
const DELAI_TIR_MIN = 70;
const DELAI_TIR_ALEATOIRE = 40;
export class Boss extends GameObject {
    constructor() {
        super(...arguments);
        this.enEntree = true;
        this.temps = 0;
        this.cooldownTir = 60;
    }
    start() {
        this.setImage(Assets.getBossImage());
        // L'image est grande : on la réduit, sinon le boss est plus gros que le canvas
        this.setWidth(LARGEUR_BOSS);
        // Il arrive d'au-dessus du canvas, au milieu
        this.setPosition({
            x: (this.getGame().CANVAS_WIDTH - this.getWidth()) / 2,
            y: -this.getHeight()
        });
    }
    update() {
        if (this.enEntree) {
            this.descendre();
            return;
        }
        this.temps++;
        this.ondule();
        this.tire();
    }
    collide(other) {
        if (other instanceof Player) {
            this.getGame().over();
        }
        if (other instanceof Laser) {
            this.getGame().destroy(other);
            this.getGame().loseBossLife();
        }
    }
    // Phase 1 : le boss entre en scène
    descendre() {
        const y = this.getPosition().y + VITESSE_ENTREE;
        this.setPosition({ x: this.getPosition().x, y: Math.min(y, Y_COMBAT) });
        if (y >= Y_COMBAT) {
            this.enEntree = false;
        }
    }
    // Phase 2 : il ondule (sinus) pour éviter les tirs du joueur. Il ne touche jamais la Terre.
    ondule() {
        const centreX = (this.getGame().CANVAS_WIDTH - this.getWidth()) / 2;
        this.setPosition({
            x: centreX + AMPLITUDE_X * Math.sin(this.temps * 2 * Math.PI / PERIODE_X),
            y: Y_COMBAT + AMPLITUDE_Y * Math.sin(this.temps * 2 * Math.PI / PERIODE_Y)
        });
    }
    tire() {
        if (this.cooldownTir > 0) {
            this.cooldownTir--;
            return;
        }
        const tir = new BossLaser(this.getGame());
        // Le projectile part du milieu du boss, par le bas
        tir.setPosition({
            x: this.getPosition().x + this.getWidth() / 2 - tir.getWidth() / 2,
            y: this.bottom() - 20
        });
        this.getGame().instanciate(tir);
        this.cooldownTir = DELAI_TIR_MIN + Math.floor(Math.random() * DELAI_TIR_ALEATOIRE);
    }
}
