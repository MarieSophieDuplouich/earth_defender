// En POO tout doit être une classe. Chaque classe a sa propre responsabilité. 
// Game s'occupe de l'affichage correct du jeu et de ses éléments. La classe GameObject quant à elle s'occupe d'un GameObject : 
// sa position, son image, sa vie.

import { Assets } from "../Assets.js";
import { Position } from "../Position.js";

export class GameObject{
    
    private position : Position;
    private image : HTMLImageElement;
    
    constructor(){
        this.position = {
            x : 0,
            y : 0
        };
        this.image = Assets.getDefaultImage();
              console.log("coucou");
    }
}