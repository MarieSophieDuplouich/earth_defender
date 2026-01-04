// import { GameObject } from "./GameObjects/GameObject.js";
// import { Player } from "./GameObjects/Player.js";
// import { Input } from "./Input.js";
// import { Music } from "./Music.js";
// import { Alien } from "./GameObjects/Alien.js";
// import { Star } from "./GameObjects/Star.js";
// import { Sol } from "./GameObjects/Sol.js";
// import { Boss } from "./GameObjects/Boss.js"
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Music } from "./Music.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Sol } from "./GameObjects/Sol.js";
import { Boss } from "./GameObjects/Boss.js";
//J'ai mis le "import Music.ts" Musique ici car quand le joueur bouge le jeu commence
// D'après Massi, je dois le mettre dans la méthode start()
// export class Game {
//     private context: CanvasRenderingContext2D;
//     public readonly CANVAS_WIDTH: number = 900;
//     public readonly CANVAS_HEIGHT: number = 600;
//     private gameEnded: boolean = false;
//     private victory: boolean = false;
//     constructor() {
//         // Init Game canvas
//         const canvas: HTMLCanvasElement = document.querySelector("canvas");
//         canvas.height = this.CANVAS_HEIGHT;
//         canvas.width = this.CANVAS_WIDTH;
//         this.context = canvas.getContext("2d");
//     }
//     private player: Player;
//     // +
//     private  alienLives: number = 10;
//     private earthLives: number = 3;
//     private playerLives: number = 1;
//     private bossLives: number = 100;
//     private sol: Sol;
//     // Boss
//     private boss: Boss | null = null;
//     private bossSpawned: boolean = false;
//     // Tous les GameObject doivent être contenus dans le tableau de GameObjects
//     private gameObjects: GameObject[] = [];
//     public instanciate(gameObject: GameObject): void {
//         this.gameObjects.push(gameObject);
//     }
//     public over(): void {
//         window.location.reload();
//         this.gameEnded = true;
//         this.victory = false;
//         Music.stopMusic();
//         Music.stopMusicBoss();
//     }
//     // gestion des vies du sol
//     public loseEarthLife(): void {
//         this.earthLives--;
//         if (this.earthLives <= 0) {
//             console.log("le sol/La Terre meurt !!");
//             this.over();
//         }
//     }
//     // gestion des vies du player
//     public losePlayerLife(): void {
//         this.playerLives--;
//         if (this.playerLives <= 0) {
//             console.log("le player meurt !!");
//             this.over();
//         }
//     }
//     // gestion des vies de l'ennemi
//     // public loseAlienLife(): void {
//     //     this.nbAliens--;
//     //     if (this.nbAliens <= 0) {
//     //         // console.log("tous les aliens sont morts");
//     //          console.log("Aliens restants :", this.nbAliens); 
//     //     }
//     // }
//     public loseAlienLife(): void {
//     this.alienLives--;
//     console.log("loseAlienLife appelée → aliens restants :", this.alienLives);
//     if (this.alienLives <= 0) {
//         console.log("TOUS LES ALIENS SONT MORTS");
//     }
// }
//     // gestion des vies du boss
//     public loseBossLife(): void {
//         this.bossLives--;
//         if (this.bossLives <= 0) {
//             this.victory = true;
//             this.gameEnded = true;
//             Music.stopMusicBoss();
//         }
//     }
//     public start(): void {
//         // sol
//         this.sol = new Sol(this);
//         this.instanciate(this.sol);
//         // musique
//         Music.initializeListeners();
//         // nettoyage canvas
//         this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//         this.context.fillStyle = "#141414";
//         this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//         // player
//         this.player = new Player(this);
//         this.instanciate(this.player);
//         Input.listen();
//         // aliens
//         for (let i = 0; i < this.alienLives; i++) {
//             this.instanciate(new Alien(this));
//         }
//         // étoiles
//         for (let i = 0; i < 100; i++) {
//             this.instanciate(new Star(this));
//         }
//         // boucle de jeu
//         this.loop();
//     }
//     // fonction draw
//     private draw(gameObject: GameObject): void {
//         this.context.drawImage(
//             gameObject.getImage(),
//             Math.round(gameObject.getPosition().x),
//             Math.round(gameObject.getPosition().y),
//             gameObject.getImage().width,
//             gameObject.getImage().height
//         );
//     }
//     private loop(): void {
//         setInterval(() => {
//             //écrans de fin victoire ou game over
//             if (this.gameEnded) {
//                 this.context.fillStyle = "black";
//                 this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//                 this.context.fillStyle = "white";
//                 this.context.font = "48px Arial";
//                 this.context.textAlign = "center";
//                 this.context.fillText(
//                     this.victory ? "VICTORY 🎉" : "GAME OVER 💀",
//                     this.CANVAS_WIDTH / 2,
//                     this.CANVAS_HEIGHT / 2
//                 );
//                 return;
//             }
//             // pause
//             if (Input.getPause()) {
//                 Music.stopMusic();
//                 Music.stopMusicBoss();
//                 this.context.fillStyle = "rgba(0,0,0,0.5)";
//                 this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//                 this.context.fillStyle = "white";
//                 this.context.font = "48px Arial";
//                 this.context.textAlign = "center";
//                 this.context.fillText("PAUSE", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
//                 return;
//             } else {
//                 Music.startMusic();
//             }
//             // apparition du boss quand tous les aliens sont morts
//             if (this.alienLives <= 0 && !this.bossSpawned) {
//                 this.boss = new Boss(this);
//                 this.instanciate(this.boss);
//                 this.bossSpawned = true;
//                 Music.stopMusic();
//                 Music.startMusicBoss();
//             }
//             // nettoyage frame
//             this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//             this.context.fillStyle = "#141414";
//             this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//             // update + draw + collisions
//             this.gameObjects.forEach(go => {
//                 go.callUpdate();
//                 this.draw(go);
//                 this.gameObjects.forEach(other => {
//                     if (other !== go && go.overlap(other)) {
//                         go.callCollide(other);
//                     }
//                 });
//             });
//             // UI vies Terre
//             this.context.fillStyle = "white";
//             this.context.font = "24px Arial";
//             this.context.textAlign = "left";
//             this.context.fillText(`${this.earthLives} 🌍`, 340, 530);
//             // UI vies player
//             this.context.textAlign = "right";
//             this.context.fillText(`${this.playerLives} 🪖⚔️`, 530, 530);
//             // UI aliens
//             this.context.textAlign = "left";
//             this.context.fillText(`${this.alienLives} 🛸`, 30, 90);
//             // UI boss
//             this.context.textAlign = "right";
//             this.context.fillText(`${this.bossLives} 👹`, 840, 90);
//         }, 10);
//     }
//     // get du player pour tirer un laser
//     public getPlayer(): Player {
//         return this.player;
//     }
//     public destroy(gameObject: GameObject): void {
//         this.gameObjects = this.gameObjects.filter(go => go !== gameObject);
//     }
// }
//J'ai mis le "import Music.ts" Musique ici car quand le joueur bouge le jeu commence
// D'après Massi, je dois le mettre dans la méthode start()
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.gameEnded = false;
        this.victory = false;
        // +
        this.alienLives = 10;
        this.earthLives = 3;
        this.playerLives = 1;
        this.bossLives = 100;
        // Boss
        this.boss = null;
        this.bossSpawned = false;
        // Tous les GameObject doivent être contenus dans le tableau de GameObjects
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
        window.location.reload();
        this.gameEnded = true;
        this.victory = false;
        Music.stopMusic();
        Music.stopMusicBoss();
    };
    // gestion des vies du sol
    Game.prototype.loseEarthLife = function () {
        this.earthLives--;
        if (this.earthLives <= 0) {
            console.log("le sol/La Terre meurt !!");
            this.over();
        }
    };
    // gestion des vies du player
    Game.prototype.losePlayerLife = function () {
        this.playerLives--;
        if (this.playerLives <= 0) {
            console.log("le player meurt !!");
            this.over();
        }
    };
    // gestion des vies de l'ennemi
    Game.prototype.loseAlienLife = function () {
        this.alienLives--;
        console.log("loseAlienLife appelée → aliens restants :", this.alienLives);
        if (this.alienLives <= 0) {
            console.log("TOUS LES ALIENS SONT MORTS");
        }
    };
    // gestion des vies du boss
    Game.prototype.loseBossLife = function () {
        this.bossLives--;
        if (this.bossLives <= 0) {
            this.victory = true;
            this.gameEnded = true;
            Music.stopMusicBoss();
        }
    };
    Game.prototype.start = function () {
        // sol
        this.sol = new Sol(this);
        this.instanciate(this.sol);
        // musique
        Music.initializeListeners();
        // nettoyage canvas
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // player
        this.player = new Player(this);
        this.instanciate(this.player);
        Input.listen();
        // aliens - CORRECTION ICI : utilise 10 au lieu de this.alienLives
        for (var i = 0; i < 10; i++) {
            this.instanciate(new Alien(this));
        }
        // étoiles
        for (var i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }
        // boucle de jeu
        this.loop();
    };
    // fonction draw
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), Math.round(gameObject.getPosition().x), Math.round(gameObject.getPosition().y), gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            //écrans de fin victoire ou game over
            if (_this.gameEnded) {
                _this.context.fillStyle = "black";
                _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
                _this.context.fillStyle = "white";
                _this.context.font = "48px Arial";
                _this.context.textAlign = "center";
                _this.context.fillText(_this.victory ? "VICTORY 🎉" : "GAME OVER 💀", _this.CANVAS_WIDTH / 2, _this.CANVAS_HEIGHT / 2);
                return;
            }
            // pause
            if (Input.getPause()) {
                Music.stopMusic();
                Music.stopMusicBoss();
                _this.context.fillStyle = "rgba(0,0,0,0.5)";
                _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
                _this.context.fillStyle = "white";
                _this.context.font = "48px Arial";
                _this.context.textAlign = "center";
                _this.context.fillText("PAUSE", _this.CANVAS_WIDTH / 2, _this.CANVAS_HEIGHT / 2);
                return;
            }
            else {
                Music.startMusic();
            }
            // apparition du boss quand tous les aliens sont morts
            if (_this.alienLives <= 0 && !_this.bossSpawned) {
                _this.boss = new Boss(_this);
                _this.instanciate(_this.boss);
                _this.bossSpawned = true;
                Music.stopMusic();
                Music.startMusicBoss();
            }
            // nettoyage frame
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            // update + draw + collisions
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                _this.gameObjects.forEach(function (other) {
                    if (other !== go && go.overlap(other)) {
                        go.callCollide(other);
                    }
                });
            });
            // UI vies Terre
            _this.context.fillStyle = "white";
            _this.context.font = "24px Arial";
            _this.context.textAlign = "left";
            _this.context.fillText("".concat(_this.earthLives, " \uD83C\uDF0D"), 340, 530);
            // UI vies player
            _this.context.textAlign = "right";
            _this.context.fillText("".concat(_this.playerLives, " \uD83E\uDE96\u2694\uFE0F"), 530, 530);
            // UI aliens
            _this.context.textAlign = "left";
            _this.context.fillText("".concat(_this.alienLives, " \uD83D\uDEF8"), 30, 90);
            // UI boss
            _this.context.textAlign = "right";
            _this.context.fillText("".concat(_this.bossLives, " \uD83D\uDC79"), 840, 90);
        }, 10);
    };
    // get du player pour tirer un laser
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.destroy = function (gameObject) {
        if (gameObject instanceof Alien) {
            console.log("Alien détruit via destroy()");
        }
        this.gameObjects = this.gameObjects.filter(function (go) { return go !== gameObject; });
    };
    return Game;
}());
export { Game };
