import { Game } from "./Classes/Game.js";
// Le jeu se lance une fois la page (et donc toutes les images) chargée.
window.addEventListener("load", () => {
    const game = new Game();
    game.start();
});
