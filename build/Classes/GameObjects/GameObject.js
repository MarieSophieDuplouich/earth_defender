// Créer un GameObject
// En POO tout doit être une classe. Chaque classe a sa propre responsabilité. Game s'occupe de l'affichage correct du jeu et de ses éléments. La classe GameObject quant à elle s'occupe d'un GameObject : sa position, son image, sa vie.
import { Assets } from "../Assets.js";
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getPlayerImage();
        this.image = Assets.getDefaultImage();
        this.game = game;
        this.start();
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
    // pourquoi cette méthode est-elle vide ?
    GameObject.prototype.start = function () {
    };
    GameObject.prototype.update = function () { };
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    ////dernière partie du cours de Massi Partie 4 - Aïe, ça fait mal. Les collisions.
    // Chapitre 9 - Détecter les collisions entre GameObject
    //     La façon de réagir à une collision est la responsabilité de la classe GameObject, pas de la classe Game !
    // Mettez à jour le contenu du forEach dans Game.loop() pour appeler une méthode GameObject.collide(other : GameObject) quand un GameObject chevauche un autre GameObject :
    GameObject.prototype.overlap = function (other) {
        if (
        // Check x axis overlap
        (other.left() <= this.left() && this.left() <= other.right()
            ||
                other.left() <= this.right() && this.right() <= other.right()
            ||
                this.left() <= other.left() && other.left() <= this.right()
            ||
                this.left() <= other.right() && other.right() <= this.right())
            &&
                (
                // check y axis overlap
                other.top() <= this.top() && this.top() <= other.bottom()
                    ||
                        other.top() <= this.bottom() && this.bottom() <= other.bottom()
                    ||
                        this.top() <= other.top() && other.top() <= this.bottom()
                    ||
                        this.top() <= other.bottom() && other.bottom() <= this.bottom())) {
            return true; // They overlap
        }
        else {
            return false; // They do not overlap
        }
    };
    /**Utility methods for gameobject position */
    GameObject.prototype.top = function () {
        return this.position.y;
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height;
    };
    GameObject.prototype.left = function () {
        return this.position.x;
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width;
    };
    return GameObject;
}());
export { GameObject };
// Exercice 15
// Mettez en place une méthode protected GameObject.collide(other:GameObject) dans la classe GameObject et sa méthode publique callCollide(other:GameObject), puis implémentez-la dans la classe Alien pour écrire "Miam Miam" dans la console quand il touche le joueur.
// Affichez un message GameOver! via un alert() quand l'alien mange le joueur.
// La méthode GameObject.update permet maintenant à n'importe quel GameObject d'effectuer des actions à chaque frame.
// C'est une partie centrale de notre jeu.
// Effectuer une action à chaque frame
// Nous voulons donner au Player la liberté de mettre à jour sa position à chaque frame du jeu.
// Pour cela, nous allons, comme pour GameObject.start(), créer une méthode protected nommée GameObject.update() qui sera appelée à chaque frame dans le setInterval().
// Dans GameObject.ts
// protected update(){}
// Il faut appeler cette méthode dans le setInterval de la méthode Game.loop(). La méthode GameObject.update() étant protected, il nous faut ajouter une méthode publique pour y accéder depuis Game.
// Laissez la méthode start vide, car ce sera à une classe fille comme Player, Alien ou Laser de la remplir avec les actions qu'elles voudront effectuer.
// Dans le cas de Player, il veut définir sa propre image et sa position en bas au centre de l'écran.
// Implémentez donc la méthode start dans Player.
