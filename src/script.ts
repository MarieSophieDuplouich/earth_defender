// const gameName: string = "EarthDefender!";
// console.log(gameName);
// import {Game} from "./Classes/Game.js";

// const game = new Game();
// import {Game} from "./Classes/Game.js";

// const game = new Game();
// game.start();


// window.onload = ()=>{
//     const game = new Game();
//     game.start();
// }


// Créer un GameObject
// En POO tout doit être une classe. Chaque classe a sa propre responsabilité. Game s'occupe de l'affichage correct du jeu et de ses éléments. La classe GameObject quant à elle s'occupe d'un GameObject : sa position, son image, sa vie.

// Dans un dossier /src/Classes/GameObjects créez un fichier nommé GameObject.ts
// src/Classes/GameObjects/GameObject.ts

// Ajoutez ensuite une position à notre GameObject.

// /src/Classes/GameObjects/GameObject.ts

// En POO la chose la plus importante est l'encapsulation. 
// Les attributs d'une classe sont privés et pourront éventuellement être modifiés via des méthodes publiques getter et setter.

// Affichage du GameObject
// Pour afficher le GameObject, je veux ajouter une méthode draw à la classe Game qui utilise la méthode context.drawImage().

// J'ai besoin d'une image et de la position du GameObject pour dessiner un GameObject dans le canvas. 
// Seulement ces données sont privées. Je vais donc créer des getter dans la classe GameObject.

// J'ajoute ensuite la méthode Game.draw pour dessiner un GameObject.

// Attention la méthode Game.draw doit se trouver dans la classe Game comme je le montre si dessous ! 
// Sinon il est impossible d'accéder au contexte du canvas ( l'attribut this.context étant privé à la classe Game).

// La méthode Game.draw() prend en paramètre un GameObject et le dessine dans la balise canvas avec la méthode this.context.drawImage() :

import { Position } from "./Classes/Position.js";
import { Assets } from "./Classes/Assets.js";

///
// const gameName: string = "EarthDefender!";
// console.log(gameName);

import {Game} from "./Classes/Game.js";
//une fois compilé ce sera du javascript

// const game = new Game();
// game.start();
// //on apelle la méthode start() dans Game.js

//Attendre le chargement des images
// Le jeu doit se lancer une fois toutes les images chargées. 
// Il faut donc attendre le chargement de la page avec la fonction window.onload avant de démarrer le jeu.
window.onload = ()=>{
    const game = new Game();
    game.start();
}


export class GameObject {

    private position: Position;
    private image: HTMLImageElement;

    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();


        this.position = {
            x: 30,
            y: 30
        };
        this.image = Assets.getPlayerImage();




    }
    // Getter d'image et de position
    public getImage(): HTMLImageElement {
        return this.image;
    }
    public getPosition(): Position {
        return this.position;
    }



    // Getter d'image et de position
    public getPlayer(): HTMLImageElement {
        return this.image;
    }




}

