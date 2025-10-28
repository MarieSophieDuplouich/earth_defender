// const gameName: string = "EarthDefender!";
// console.log(gameName);
// import {Game} from "./Classes/Game.js";
import { Assets } from "./Classes/Assets.js";
///
// const gameName: string = "EarthDefender!";
// console.log(gameName);
import { Game } from "./Classes/Game.js";
//une fois compilé ce sera du javascript
// const game = new Game();
// game.start();
// //on apelle la méthode start() dans Game.js
//Attendre le chargement des images
// Le jeu doit se lancer une fois toutes les images chargées. 
// Il faut donc attendre le chargement de la page avec la fonction window.onload avant de démarrer le jeu.
window.onload = function () {
    var game = new Game();
    game.start();
};
var GameObject = /** @class */ (function () {
    function GameObject() {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.position = {
            x: 30,
            y: 30
        };
        this.image = Assets.getPlayerImage();
    }
    // Getter d'image et de position
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    // Getter d'image et de position
    GameObject.prototype.getPlayer = function () {
        return this.image;
    };
    return GameObject;
}());
export { GameObject };
