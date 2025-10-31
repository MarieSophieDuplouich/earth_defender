import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Music } from "./Music.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Sol } from "./GameObjects/Sol.js";
//J'ai mis le "import Music.ts" Musique ici car quand le joueur bouge le jeu commence
// D'après Massi, je dois le mettre dans la méthode start()
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        // +
        this.nbAliens = 10;
        this.earthLives = 3;
        this.playerLives = 1;
        // private boss : Boss;
        // Tous les GameObject doivent être contenus dans le tableau de GameObjects pour être détectés 
        // par la boucle d'événement, il nous faut donc mettre à jour
        //  le code de la fonction Game.start() pour rajouter notre player dans ce tableau.
        this.gameObjects = [];
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.instanciate = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.over = function () {
        // alert("GameOver!")
        window.location.reload();
        //une fenêtre s'ouvre
    };
    //gestion des vies du sol
    Game.prototype.loseEarthLife = function () {
        this.earthLives--;
        if (this.earthLives <= 0) {
            // this.over();
            console.log("le sol/La Terre meurt !!");
        }
    };
    //gestion des vies du player
    Game.prototype.losePlayerLife = function () {
        this.playerLives--;
        if (this.playerLives <= 0) {
            // this.over();
            console.log("le player  meurt !!");
        }
    };
    //gestion des vies de l'ennemi
    Game.prototype.loseAlienLife = function () {
        this.nbAliens--;
        if (this.nbAliens <= 0) {
            // this.over();
            console.log("l'alien  meurt !!");
        }
    };
    Game.prototype.start = function () {
        //sol
        this.sol = new Sol(this); // je pense pas qu'il y ait un intérêt car il y a un sol
        this.instanciate(this.sol);
        //LA MUSIQUE
        Music.startMusic();
        //La musique du laser/missile ici ?
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // J'instancie le Player avec new Player(this)
        // Je le dessine avec this.draw
        this.player = new Player(this);
        // Écoute les inputs
        // J'ajoute le player au tableau de GameObject
        this.instanciate(this.player);
        Input.listen();
        // Démarre la boucle de jeu
        this.loop();
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }
        for (var i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }
    };
    //  La fonction draw qui affiche un gameObject
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            if (Input.getPause()) {
                // Affichage optionnel "PAUSE"
                _this.context.fillStyle = "rgba(0,0,0,0.5)";
                _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
                _this.context.fillStyle = "white";
                _this.context.font = "48px Arial";
                _this.context.textAlign = "center";
                _this.context.fillText("PAUSE", _this.CANVAS_WIDTH / 2, _this.CANVAS_HEIGHT / 2);
                return; // Arrête l'update/draw pour cette frame
            }
            // J'efface la frame précédente.
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                //Je dois donc créer une méthode overlap ...
                // Implémentez la méthode GameObject.overlap() qui permet de vérifier si un GameObject en touche un autre.
                if (go instanceof Alien && _this.player.overlap(go)) {
                    console.log("Alien touche le joueur");
                }
            });
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                _this.gameObjects.forEach(function (other) {
                    // +
                    // Si le gameObject chevauche un gameObject qui n'est pas lui-même
                    if (other != go && go.overlap(other)) {
                        console.log("Deux GameObject différents se touchent");
                        go.callCollide(other); // J'appelle la méthode collide de mon GameObject
                    }
                });
            });
            // Affichage des 3 vies de  la Terre ("3 🌍")
            _this.context.fillStyle = "white";
            _this.context.font = "24px Arial";
            _this.context.textAlign = "left";
            _this.context.fillText("".concat(_this.earthLives, " \uD83C\uDF0D"), 340, 530);
            //affichage de la vie du Player
            _this.context.fillStyle = "white";
            _this.context.font = "24px Arial";
            _this.context.textAlign = "right";
            _this.context.fillText("".concat(_this.playerLives, " \uD83E\uDE96\u2694\uFE0F"), 530, 530);
            //Affichage vie de l'ennemi
            _this.context.fillStyle = "white";
            _this.context.font = "24px Arial";
            _this.context.textAlign = "left";
            _this.context.fillText("".concat(_this.nbAliens, " \uD83D\uDEF8"), 30, 90);
        }, 10); // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    };
    // get du player pour tirer un laser
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.destroy = function (gameObject) {
        // Supprimer gameObject du tableau de gameObjects
        this.gameObjects = this.gameObjects.filter(function (go) { return go != gameObject; });
    };
    return Game;
}());
export { Game };
// Exercice 16 - Détruire un gameObject
// Supprimez gameObject du tableau de gameObjects à l'appel de Game.destroy() class Game
// public destroy(gameObject : GameObject) : void{
//     // Codez ici ...
//     // Supprimer gameObject du tableau de gameObjects
// }
// Chapitre 11 - Tirer un Laser.
// Pour tirer un laser, nous allons avoir besoin de la position du joueur dans une future classe Laser.
// Ajoutez donc un getter de Player dans Game.
// class Game
// public getPlayer() : Player{
//     return this.player;
// }
