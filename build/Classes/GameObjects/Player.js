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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(GameObject));
export { Player };
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
