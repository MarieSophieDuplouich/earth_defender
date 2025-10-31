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
import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Input } from "../Input.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10;
        return _this;
    }
    Player.prototype.start = function () {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        });
    };
    Player.prototype.update = function () {
        if (Input.getPause())
            return;
        if (Input.getIsShooting())
            return;
        if (Input.getshootMusiques())
            return;
        this.setPosition({
            x: this.getPosition().x += this.speed * Input.getAxisX(),
            y: this.getPosition().y
        });
    };
    return Player;
}(GameObject));
export { Player };
//exercice 6 dessiner le joueur
// Astuce : Souvenez-vous que l'origine (0,0) 
// du canvas est en haut à gauche. 
// Et que le center horinzontal est à CANVAS_WIDTH/2.
// Utilisez donc la fonction this.getGame().CANVAS_WIDTH pour accéder à la largeur du canvas depuis la classe Player.
// Pour créer la classe Player à partir de la classe GameObject, nous allons la faire hériter de GameObject avec le mot clé extends :
// src/Classes/GameObjects/Player.ts
// import { GameObject } from "./GameObject.js";
// export class Player extends GameObject{
// }
// Nous voulons que le Player puisse gérer indépendamment son initialisation (image, position).
// Pour cela, la classe GameObject va lui fournir une méthode à laquelle lui seul aura accès : une méthode protected.
// Les méthodes protected sont accessibles uniquement depuis la classe mère et ses enfants.
// Dans la classe GameObject, ajoutez une méthode protected start() :
// Laissez la méthode start vide, car ce sera à une classe fille comme Player, Alien ou Laser de la remplir avec les actions qu'elles voudront effectuer.
// Dans le cas de Player, il veut définir sa propre image et sa position en bas au centre de l'écran.
// Implémentez donc la méthode start dans Player.
// Grâce à la méthode GameObject.setPosition() 
// et aux constantes CANVAS_WIDTH et CANVAS_HEIGHT, positionnez le joueur au centre bas du canvas à 10px du bord.
