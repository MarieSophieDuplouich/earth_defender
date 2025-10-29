import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";

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
    public start(): void {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        console.log("coucou");

        // J'instancie un GameObject
        const gameObject = new GameObject(this);
        // Je le dessine
        this.draw(gameObject);


        // J'instancie le Player avec new Player(this)


        // Je le dessine avec this.draw

        this.player = new Player(this);
        this.draw(this.player);
        // Écoute les inputs

        Input.listen();
        // Démarre la boucle de jeu
        this.loop();

        // //alien
        // this.alien = new Alien(this);
        // this.draw(this.alien);

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
            console.log("Frame!");
            // J'efface la frame précédente.
            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

            // Je redessine le joueur à chaque frame
            this.draw(this.player);

            // Je mets à jour le joueur
            this.player.callUpdate();

        }, 10); // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    }

}




// const image = new Image(60, 45); // Using optional size for image
// image.onload = drawImageActualSize; // Draw when image has loaded

// // Load an image of intrinsic size 300x227 in CSS pixels
// image.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";

// function drawImageActualSize() {
//   // Use the intrinsic size of image in CSS pixels for the canvas element
//   canvas.width = this.naturalWidth;
//   canvas.height = this.naturalHeight;

//   // Will draw the image as 300x227, ignoring the custom size of 60x45
//   // given in the constructor
//   ctx.drawImage(this, 0, 0);

//   // To use the custom size we'll have to specify the scale parameters
//   // using the element's width and height properties - lets draw one
//   // on top in the corner:
//   ctx.drawImage(this, 0, 0, this.width, this.height);
// }