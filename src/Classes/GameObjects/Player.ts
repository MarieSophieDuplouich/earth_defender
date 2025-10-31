import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Input } from "../Input.js";


export class Player extends GameObject {
      private speed : number = 10;

    protected start(): void {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        });

    }

    
 protected update(): void {

    if (Input.getPause()) return;
    if (Input.getIsShooting()) return;
    if(Input.getshootMusiques())return;


        this.setPosition({
            x : this.getPosition().x += this.speed*Input.getAxisX(),
            y : this.getPosition().y
        })

    }

}

//exercice 6 dessiner le joueur
// Astuce : Souvenez-vous que l'origine (0,0) 
// du canvas est en haut à gauche. 
// Et que le center horinzontal est à CANVAS_WIDTH/2.
// Utilisez donc la fonction this.getGame().CANVAS_WIDTH pour accéder à la largeur du canvas depuis la classe Player.





// Pour créer la classe Player à partir de la classe GameObject, nous allons la faire hériter de GameObject avec le mot clé extends :

// src/Classes/GameObjects/Player.ts

// import { GameObject } from "./GameObject.js";

// export class Player extends GameObject{
// }
// Nous voulons que le Player puisse gérer indépendamment son initialisation (image, position).

// Pour cela, la classe GameObject va lui fournir une méthode à laquelle lui seul aura accès : une méthode protected.

// Les méthodes protected sont accessibles uniquement depuis la classe mère et ses enfants.

// Dans la classe GameObject, ajoutez une méthode protected start() :

// Laissez la méthode start vide, car ce sera à une classe fille comme Player, Alien ou Laser de la remplir avec les actions qu'elles voudront effectuer.

// Dans le cas de Player, il veut définir sa propre image et sa position en bas au centre de l'écran.

// Implémentez donc la méthode start dans Player.

// Grâce à la méthode GameObject.setPosition() 
// et aux constantes CANVAS_WIDTH et CANVAS_HEIGHT, positionnez le joueur au centre bas du canvas à 10px du bord.

