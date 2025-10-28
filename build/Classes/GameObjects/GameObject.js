// Créer un GameObject
// En POO tout doit être une classe. Chaque classe a sa propre responsabilité. Game s'occupe de l'affichage correct du jeu et de ses éléments. La classe GameObject quant à elle s'occupe d'un GameObject : sa position, son image, sa vie.
import { Assets } from "../Assets.js";
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.game = game;
        this.position = {
            x: 100,
            y: 50
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
    // Et ajoutez un getter public pour que les GameObjects puissent accéder au Game. j'ai compris qu'il falalit mettre getGame dans ce fichier pas dans 
    //Game.ts
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    return GameObject;
}());
export { GameObject };
