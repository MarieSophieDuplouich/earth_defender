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
import { Assets } from "../Assets.ts";
import { GameObject } from "./GameObject.js";
var Alien = /** @class */ (function (_super) {
    __extends(Alien, _super);
    function Alien() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        return _this;
    }
    Alien.prototype.start = function () {
        // Définissez l'image de l'alien
        // Codez ici ...
        this.setImage(Assets.getAlienImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        });
        // Faites-le apparaître à une position aléatoire dans le canvas
        // Codez ici ...
    };
    Alien.prototype.update = function () {
        // Faites avancer l'alien vers le bas du Canvas
        // Codez ici ...   
        this.setPosition({
            x: this.getPosition().x += this.speed * Input.getAxisX(),
            y: this.getPosition().y
        });
    };
    return Alien;
}(GameObject));
export { Alien };
//// ancien code sans poo
// Aliens
//         for (let i = aliens.length - 1; i >= 0; i--) {
//             const alien = aliens[i];
//             alien.move(1); // Descente des aliens
//             context.drawImage(
//                 alien.image,
//                 alien.position.x,
//                 alien.position.y,
//                 alien.image.width,
//                 alien.image.height
//             );
var nbAliens = 10;
//     for (let i = 0; i < nbAliens; i++) {
//         aliens.push(new GameObject(alienImg, {
//             x: Math.random() * (CANVAS_WIDTH - alienImg.width),
//             y: Math.random() * -200
//         }));
//     }
