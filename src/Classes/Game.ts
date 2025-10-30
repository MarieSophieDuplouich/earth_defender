import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Music } from "./Music.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Sol } from "./GameObjects/Sol.js";


//J'ai mis le "import Music.ts" Musique ici car quand le joueur bouge le jeu commence
// D'après Massi, je dois le mettre dans la méthode start()

export class Game {

    private context: CanvasRenderingContext2D;
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;


    constructor() {
        // Init Game canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");

    }
    private player: Player;
    // +
    private alien: Alien;
    private nbAliens: number = 10;
    private earthLives : number = 3;
    private playerLives : number = 1;
    // private alienLives : number = 1;
    private sol: Sol;
 

    // private boss : Boss;


    // Tous les GameObject doivent être contenus dans le tableau de GameObjects pour être détectés 
    // par la boucle d'événement, il nous faut donc mettre à jour
    //  le code de la fonction Game.start() pour rajouter notre player dans ce tableau.
    private gameObjects: GameObject[] = [];

    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    public over(): void {
        alert("GameOver!")
        window.location.reload();
        //une fenêtre s'ouvre
    }
    //gestion des vies du sol
    public loseEarthLife():void{
    
     this.earthLives--;
     if (this.earthLives <= 0) {
        this.over();
        console.log("le sol/La Terre meurt !!");
    }
    }

        //gestion des vies du player
    public losePlayerLife():void{
    
     this.playerLives--;
     if (this.playerLives <= 0) {
        this.over();
        console.log("le player  meurt !!");
    }
    }

           //gestion des vies de l'ennemi
    public loseAlienLife():void{
    
     this.nbAliens--;
     if (this.nbAliens <= 0) {
        this.over();
        console.log("l'alien  meurt !!");
    }
    }


    public start(): void {

        //sol
        this.sol = new Sol(this); // je pense pas qu'il y ait un intérêt car il y a un sol
        this.instanciate(this.sol);
        this.draw;


        //LA MUSIQUE

        Music.startMusic();

        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // J'instancie un GameObject
        const gameObject = new GameObject(this);
        // Je le dessine
        this.draw(gameObject);




        // J'instancie le Player avec new Player(this)


        // Je le dessine avec this.draw

        this.player = new Player(this);
        this.draw(this.player);
        // Écoute les inputs
        // J'ajoute le player au tableau de GameObject
        this.instanciate(this.player);

        Input.listen();
        // Démarre la boucle de jeu
        this.loop();
        // ++ Instanciation de l'alien
        //alien
        this.alien = new Alien(this);
        this.draw(this.alien);

        //   const nbAliens = 10; ancien code 
        // for (let i = 0; i < nbAliens; i++) {
        //     aliens.push(new GameObject(alienImg, {
        //         x: Math.random() * (CANVAS_WIDTH - alienImg.width),
        //         y: Math.random() * -200
        //     }));
        // }


        for (let i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }

        // Fond étoilé ancien code
        //         for (let i = 0; i < 30; i++) {
        //             context.drawImage(
        //                 starImage,
        //                 Math.random() * CANVAS_WIDTH,
        //                 Math.random() * CANVAS_HEIGHT,
        //                 starImage.width,
        //                 starImage.height
        //             );
        //         }

        for (let i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }

    }



    //  La fonction draw qui affiche un gameObject
    private draw(gameObject: GameObject) {

        this.context.drawImage(
            gameObject.getImage(),
            gameObject.getPosition().x,
            gameObject.getPosition().y,
            gameObject.getImage().width,
            gameObject.getImage().height

        );

        //         gameObject.addEventListener("click", function (gameObject) {
        //   console.log("coucou"); // logs the className of my_element
        //   console.log(gameObject.currentTarget === this); // logs `true`
        // });
    }

    private loop() {
        setInterval(() => {
            // console.log("Frame!");
            // J'efface la frame précédente.
            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);


            // Je mets à jour le joueur
            this.player.callUpdate();

            // Je redessine le joueur à chaque frame
            this.draw(this.player);

            this.alien.callUpdate();
            this.draw(this.alien);

            //La Musique du boss
            // Music.startMusicBoss();

            // Pour chaque gameObject
            // Mettez-les à jour et redessinez-les
            // Chapitre 9 - Détecter les collisions entre GameObject
            // Pour détecter une collision, il faut savoir si un GameObject est en contact avec un autre.

            // Dans la boucle d'événements, j'ai actuellement une boucle for qui dessine tous les GameObjects.
            //Pour commencer, on peut vérifier si un alien touche le joueur.
            // this.gameObjects.forEach(go => {
            //     go.callUpdate();
            //     this.draw(go);
            //     //Je dois donc créer une méthode overlap ...
            //    // Implémentez la méthode GameObject.overlap() qui permet de vérifier si un GameObject en touche un autre.
            //     if (go instanceof Alien && this.player.overlap(go)) {
            //         console.log("Alien touche le joueur");
            //     }

            // })

            this.gameObjects.forEach(go => {
                go.callUpdate();
                this.draw(go);

                this.gameObjects.forEach(other => {
                    // +
                    // Si le gameObject chevauche un gameObject qui n'est pas lui-même
                    if (other != go && go.overlap(other)) {
                        console.log("Deux GameObject différents se touchent");
                        go.callCollide(other); // J'appelle la méthode collide de mon GameObject
                    }
                })
            })



        // Affichage des 3 vies de  la Terre ("3 🌍")
        this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.textAlign = "left";
       this.context.fillText(`${this.earthLives} 🌍`, 340, 530);

       //affichage de la vie du Player

       this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.textAlign = "right";
       this.context.fillText(`${this.playerLives} 🪖⚔️`, 530, 530);

       //Affichage vie de l'ennemi

       this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.textAlign = "left";
       this.context.fillText(`${this.nbAliens} 🛸`, 30, 90);


        }, 10); // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    }


    // get du player pour tirer un laser

    public getPlayer(): Player {
        return this.player;
    }

    public destroy(gameObject: GameObject): void {
        // Codez ici ...
        // Supprimer gameObject du tableau de gameObjects
        this.gameObjects = this.gameObjects.filter(go => go != gameObject);

    }
}
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