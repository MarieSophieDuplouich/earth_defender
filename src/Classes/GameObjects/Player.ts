import { GameObject } from "./GameObject.js";

export class Player extends GameObject{

    


}




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