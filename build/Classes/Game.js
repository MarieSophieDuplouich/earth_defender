import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        console.log("coucou");
        // J'instancie un GameObject
        var gameObject = new GameObject(this);
        // Je le dessine
        this.draw(gameObject);
        this.loop();
        // J'instancie le Player avec new Player(this)
        // codez ici...
        // Je le dessine avec this.draw
        // codez ici...
        this.player = new Player(this);
        this.draw(this.player);
    };
    //  La fonction draw qui affiche un gameObject//ici ça ne va pas 
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
        //         gameObject.addEventListener("click", function (gameObject) {
        //   console.log("coucou"); // logs the className of my_element
        //   console.log(gameObject.currentTarget === this); // logs `true`
        // });
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            console.log("Frame!");
            // J'efface la frame précédente.
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            // Je redessine le joueur à chaque frame
            _this.draw(_this.player);
            // Je mets à jour le joueur
            _this.player.callUpdate();
        }, 10); // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    };
    return Game;
}());
export { Game };
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
