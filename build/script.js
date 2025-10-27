// const gameName: string = "EarthDefender!";
// console.log(gameName);
// import {Game} from "./Classes/Game.js";
// const game = new Game();
import { Game } from "./Classes/Game.js";
var game = new Game();
game.start();
window.onload = function () {
    var game = new Game();
    game.start();
};
