// import { GameObject } from "./GameObjects/GameObject.js";
// import { Player } from "./GameObjects/Player.js";
// import { Input } from "./Input.js";
// import { Music } from "./Music.js";
// import { Alien } from "./GameObjects/Alien.js";
// import { Star } from "./GameObjects/Star.js";
// import { Sol } from "./GameObjects/Sol.js";
// import { Boss } from "./GameObjects/Boss.js"


// //J'ai mis le "import Music.ts" Musique ici car quand le joueur bouge le jeu commence
// // D'après Massi, je dois le mettre dans la méthode start()

// export class Game {

//     private context: CanvasRenderingContext2D;
//     public readonly CANVAS_WIDTH: number = 900;
//     public readonly CANVAS_HEIGHT: number = 600;


//     constructor() {
//         // Init Game canvas
//         const canvas: HTMLCanvasElement = document.querySelector("canvas");
//         canvas.height = this.CANVAS_HEIGHT;
//         canvas.width = this.CANVAS_WIDTH;
//         this.context = canvas.getContext("2d");

//     }
//     private player: Player;
//     // +
//     private nbAliens: number = 10;
//     private earthLives: number = 3;
//     private playerLives: number = 1;
//     private alienLives: number = 1;
//     private sol: Sol;
//     private bossLives: number = 100;


//     // Tous les GameObject doivent être contenus dans le tableau de GameObjects pour être détectés 
//     // par la boucle d'événement, il nous faut donc mettre à jour
//     //  le code de la fonction Game.start() pour rajouter notre player dans ce tableau.
//     private gameObjects: GameObject[] = [];

//     public instanciate(gameObject: GameObject): void {
//         this.gameObjects.push(gameObject);
//     }

//     public over(): void {
//         // alert("GameOver!")
//         window.location.reload();
//         //une fenêtre s'ouvre
//     }
//     //gestion des vies du sol
//     public loseEarthLife(): void {

//         this.earthLives--;
//         if (this.earthLives <= 0) {
//             // this.over();
//             console.log("le sol/La Terre meurt !!");
//         }
//     }

//     //gestion des vies du player
//     public losePlayerLife(): void {

//         this.playerLives--;
//         if (this.playerLives <= 0) {
//             // this.over();
//             console.log("le player  meurt !!");
//         }
//     }

//     //gestion des vies de l'ennemi
//     public loseAlienLife(): void {

//         this.nbAliens--;
//         if (this.nbAliens <= 0) {
//             // this.over();
//             console.log("l'alien  meurt !!");
//         }
//     }

//     //gestion des vies du boss
//     public loseBossLife(): void {
//         this.bossLives--;
//         if (this.bossLives <= 0) {
//             // this.over();
//             console.log("le boss  meurt, tu as gagné le jeu !!");
//         }
//     }







//     public start(): void {

//         //sol
//         this.sol = new Sol(this); // je pense pas qu'il y ait un intérêt car il y a un sol
//         this.instanciate(this.sol);


//         //LA MUSIQUE

//         Music.startMusic();

//         //La musique du laser/missile ici ?

//         // Input.getshootMusiques();

//         this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//         this.context.fillStyle = "#141414";
//         this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

//         // J'instancie le Player avec new Player(this)


//         // Je le dessine avec this.draw

//         this.player = new Player(this);
//         // Écoute les inputs
//         // J'ajoute le player au tableau de GameObject
//         this.instanciate(this.player);

//         Input.listen();
//         // Démarre la boucle de jeu
//         this.loop();

//         // boss

//         this.boss = new Boss(this);
//         // Écoute les inputs
//         // J'ajoute le player au tableau de GameObject
//         this.instanciate(this.boss);


//         for (let i = 0; i < this.nbAliens; i++) {
//             this.instanciate(new Alien(this));
//         }


//         for (let i = 0; i < 100; i++) {
//             this.instanciate(new Star(this));
//         }



//     }



//     //  La fonction draw qui affiche un gameObject
//     private draw(gameObject: GameObject) {

//         this.context.drawImage(
//             gameObject.getImage(),
//             gameObject.getPosition().x,
//             gameObject.getPosition().y,
//             gameObject.getImage().width,
//             gameObject.getImage().height

//         );
//     }

//     private loop() {
//         setInterval(() => {
//             if (Input.getPause()) {
//                 // Affichage optionnel "PAUSE"
//                 this.context.fillStyle = "rgba(0,0,0,0.5)";
//                 this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//                 this.context.fillStyle = "white";
//                 this.context.font = "48px Arial";
//                 this.context.textAlign = "center";
//                 this.context.fillText("PAUSE", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
//                 return; // Arrête l'update/draw pour cette frame
//                 //il faudrait quand j'appuie sur pause que la musique s'arrête
//             }



//             // J'efface la frame précédente.
//             this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//             this.context.fillStyle = "#141414";
//             this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
//             this.gameObjects.forEach(go => {
//                 go.callUpdate();
//                 this.draw(go);
//                 //Je dois donc créer une méthode overlap ...
//                 // Implémentez la méthode GameObject.overlap() qui permet de vérifier si un GameObject en touche un autre.
//                 if (go instanceof Alien && this.player.overlap(go)) {
//                     console.log("Alien touche le joueur");
//                 }

//             })

//             this.gameObjects.forEach(go => {
//                 go.callUpdate();
//                 this.draw(go);

//                 this.gameObjects.forEach(other => {
//                     // +
//                     // Si le gameObject chevauche un gameObject qui n'est pas lui-même
//                     if (other != go && go.overlap(other)) {
//                         console.log("Deux GameObject différents se touchent");
//                         go.callCollide(other); // J'appelle la méthode collide de mon GameObject
//                     }
//                 })
//             })



//             // Affichage des 3 vies de  la Terre ("3 🌍")
//             this.context.fillStyle = "white";
//             this.context.font = "24px Arial";
//             this.context.textAlign = "left";
//             this.context.fillText(`${this.earthLives} 🌍`, 340, 530);

//             //affichage de la vie du Player

//             this.context.fillStyle = "white";
//             this.context.font = "24px Arial";
//             this.context.textAlign = "right";
//             this.context.fillText(`${this.playerLives} 🪖⚔️`, 530, 530);

//             //Affichage vie de l'ennemi

//             this.context.fillStyle = "white";
//             this.context.font = "24px Arial";
//             this.context.textAlign = "left";
//             this.context.fillText(`${this.nbAliens} 🛸`, 30, 90);

//             //Affichage vie du boss

//             this.context.fillStyle = "white";
//             this.context.font = "24px Arial";
//             this.context.textAlign = "right";
//             this.context.fillText(`${this.bossLives} 👹`, 840, 90);


//         }, 10); // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
//     }


//     // get du player pour tirer un laser

//     public getPlayer(): Player {
//         return this.player;
//     }

//     public destroy(gameObject: GameObject): void {
//         // Supprimer gameObject du tableau de gameObjects
//         this.gameObjects = this.gameObjects.filter(go => go != gameObject);

//     }
// }


// // Exercice 16 - Détruire un gameObject
// // Supprimez gameObject du tableau de gameObjects à l'appel de Game.destroy() class Game

// // public destroy(gameObject : GameObject) : void{
// //     // Codez ici ...
// //     // Supprimer gameObject du tableau de gameObjects

// // }

// // Chapitre 11 - Tirer un Laser.
// // Pour tirer un laser, nous allons avoir besoin de la position du joueur dans une future classe Laser.

// // Ajoutez donc un getter de Player dans Game.

// // class Game

// // public getPlayer() : Player{
// //     return this.player;
// // }

import { GameObject } from "./GameObjects/GameObject.js";
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

export class Game {

    private context: CanvasRenderingContext2D;
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;

    private gameEnded: boolean = false;
    private victory: boolean = false;


    constructor() {
        // Init Game canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }

    private player: Player;

    // +
    private alienLives: number = 10;
    private earthLives: number = 3;
    private playerLives: number = 1;
    private bossLives: number = 100;

    private sol: Sol;

    // Boss
    private boss: Boss | null = null;
    private bossSpawned: boolean = false;

    // Tous les GameObject doivent être contenus dans le tableau de GameObjects
    private gameObjects: GameObject[] = [];

    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    public over(): void {
        window.location.reload();
        this.gameEnded = true;
        this.victory = false;
        Music.stopMusic();
        Music.stopMusicBoss();
    }

    // gestion des vies du sol
    public loseEarthLife(): void {
        this.earthLives--;
        if (this.earthLives <= 0) {
            console.log("le sol/La Terre meurt !!");
            this.over();
        }
    }

    // gestion des vies du player
    public losePlayerLife(): void {
        this.playerLives--;
        if (this.playerLives <= 0) {
            console.log("le player meurt !!");
            this.over();
        }
    }

    // gestion des vies de l'ennemi
    public loseAlienLife(): void {
        this.alienLives--;
        console.log("loseAlienLife appelée → aliens restants :", this.alienLives);

        if (this.alienLives <= 0) {
            console.log("TOUS LES ALIENS SONT MORTS");
        }
    }

    // gestion des vies du boss
    public loseBossLife(): void {
        this.bossLives--;
        if (this.bossLives <= 0) {
            this.victory = true;
            this.gameEnded = true;
            Music.stopMusicBoss();
        }
    }


    public start(): void {

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
        for (let i = 0; i < 10; i++) {
            this.instanciate(new Alien(this));
        }

        // étoiles
        for (let i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }

        // boucle de jeu
        this.loop();
    }

    // fonction draw
    private draw(gameObject: GameObject): void {
        this.context.drawImage(
            gameObject.getImage(),
            Math.round(gameObject.getPosition().x),
            Math.round(gameObject.getPosition().y),
            gameObject.getImage().width,
            gameObject.getImage().height
        );
    }

    private loop(): void {
        setInterval(() => {
            //écrans de fin victoire ou game over
            if (this.gameEnded) {
                this.context.fillStyle = "black";
                this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

                this.context.fillStyle = "white";
                this.context.font = "48px Arial";
                this.context.textAlign = "center";

                this.context.fillText(
                    this.victory ? "VICTORY 🎉" : "GAME OVER 💀",
                    this.CANVAS_WIDTH / 2,
                    this.CANVAS_HEIGHT / 2
                );
                return;
            }

            // pause
            if (Input.getPause()) {

                Music.stopMusic();
                Music.stopMusicBoss();
                this.context.fillStyle = "rgba(0,0,0,0.5)";
                this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
                this.context.fillStyle = "white";
                this.context.font = "48px Arial";
                this.context.textAlign = "center";
                this.context.fillText("PAUSE", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
                return;
            } else {
                Music.startMusic();
            }

            // apparition du boss quand tous les aliens sont morts
            if (this.alienLives <= 0 && !this.bossSpawned) {
                this.boss = new Boss(this);
                this.instanciate(this.boss);
                this.bossSpawned = true;

                Music.stopMusic();
                Music.startMusicBoss();
            }

            // nettoyage frame
            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

            // update + draw + collisions
            this.gameObjects.forEach(go => {
                go.callUpdate();
                this.draw(go);

                this.gameObjects.forEach(other => {
                    if (other !== go && go.overlap(other)) {
                        go.callCollide(other);
                    }
                });
            });

            // UI vies Terre
            this.context.fillStyle = "white";
            this.context.font = "24px Arial";
            this.context.textAlign = "left";
            this.context.fillText(`${this.earthLives} 🌍`, 340, 530);

            // UI vies player
            this.context.textAlign = "right";
            this.context.fillText(`${this.playerLives} 🪖⚔️`, 530, 530);

            // UI aliens
            this.context.textAlign = "left";
            this.context.fillText(`${this.alienLives} 🛸`, 30, 90);

            // UI boss
            this.context.textAlign = "right";
            this.context.fillText(`${this.bossLives} 👹`, 840, 90);

        }, 10);
    }

    // get du player pour tirer un laser
    public getPlayer(): Player {
        return this.player;
    }

    public destroy(gameObject: GameObject): void {
        if (gameObject instanceof Alien) {
            console.log("Alien détruit via destroy()");
        }
        this.gameObjects = this.gameObjects.filter(go => go !== gameObject);
    }
}

