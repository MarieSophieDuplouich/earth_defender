var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
var Sol = /** @class */ (function (_super) {
    __extends(Sol, _super);
    function Sol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sol.prototype.start = function () {
        //sol le positionner dans le canva
        this.setImage(Assets.getSolImage());
        this.setPosition({
            x: 0,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height + 10
        });
        //     const ground = new GameObject(
        //         groundImg,
        //         { x: 0, y: CANVAS_HEIGHT - groundImg.height + 90 }
        //         // Je ne peux déplacer comme en css il fau faire ici le -50 pour déplacer le sol
        //     );
    };
    Sol.prototype.update = function () {
        // Le sol est fixe, donc rien ici
    };
    return Sol;
}(GameObject));
export { Sol };
//     const ground = new GameObject(
//         groundImg,
//         { x: 0, y: CANVAS_HEIGHT - groundImg.height }
//     );
//         // Dessiner le sol
//         context.drawImage(
//             ground.image,
//             ground.position.x,
//             ground.position.y,
//             ground.image.width,
//             ground.image.height
//         );
// --- Variables de jeu --- //
//     type Direction = -1 | 0 | 1;
//     let direction: Direction = 0;
//     let gameOver = false;
//     // Génération initiale d’aliens
//     const nbAliens = 10;
//     for (let i = 0; i < nbAliens; i++) {
//         aliens.push(new GameObject(alienImg, {
//             x: Math.random() * (CANVAS_WIDTH - alienImg.width),
//             y: Math.random() * -200
//         }));
//     }
//     // Vies de la Terre
//     let earthLives = 3;
//     //vies du joueur
//     let livesPlayer = 10;
//     // Il faut en tuer 15 pour gagner
//     let ennemiSkilledlive = 15;
