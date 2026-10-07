
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
//Il faut mettre ici tout ce qu'on voit pas la musique

import { Position } from "../Position.js";
import { Game } from "../Game.js";
import { Assets } from "../Assets.js";



export class GameObject {


    private position: Position;
    private image: HTMLImageElement;
    private game: Game;


    constructor(game: Game) {

        this.position = {
            x: 0,
            y: 0
        };


        this.image = Assets.getPlayerImage();
        this.image = Assets.getDefaultImage();
        this.game = game;
        this.start();
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
    // Et ajoutez un getter public pour que les GameObjects puissent accéder au Game. j'ai compris qu'il falalit mettre getGame dans ce fichier pas dans 
    //Game.ts
    public getGame(): Game {
        return this.game;
    }

    public setImage(image: HTMLImageElement) {
        this.image = image;
    }
    public setPosition(position: Position) {
        this.position = position;
    }

    public setWidth(width : number) : void{
        this.image.width = width;
    }

    // pourquoi cette méthode est-elle vide ?
    protected start() {

    }

     // Getter d'image et de position Boss
    public getBoss(): HTMLImageElement {
        return this.image;
    }




    protected update() { }
    public callUpdate() {
        this.update();
    }

    protected collide(other: GameObject) { }

    public callCollide(other: GameObject): void {
        this.collide(other);
    }

    ////dernière partie du cours de Massi Partie 4 - Aïe, ça fait mal. Les collisions.
    // Chapitre 9 - Détecter les collisions entre GameObject
    //     La façon de réagir à une collision est la responsabilité de la classe GameObject, pas de la classe Game !

    // Mettez à jour le contenu du forEach dans Game.loop() pour appeler une méthode GameObject.collide(other : GameObject) quand un GameObject chevauche un autre GameObject :



    public overlap(other: GameObject): boolean {
        if (
            // Check x axis overlap// là il faut m'expliquer 
            (
                other.left() <= this.left() && this.left() <= other.right()
                ||
                other.left() <= this.right() && this.right() <= other.right()
                ||
                this.left() <= other.left() && other.left() <= this.right()
                ||
                this.left() <= other.right() && other.right() <= this.right()
            )
            &&
            (
                // check y axis overlap
                other.top() <= this.top() && this.top() <= other.bottom()
                ||
                other.top() <= this.bottom() && this.bottom() <= other.bottom()
                ||
                this.top() <= other.top() && other.top() <= this.bottom()
                ||
                this.top() <= other.bottom() && other.bottom() <= this.bottom()
            )
        ) {
            return true;        // They overlap
        }
        else {
            return false;       // They do not overlap
        }
    }

    /**Utility methods for gameobject position */
    public top(): number {
        return this.position.y;
    }
    public bottom(): number {
        return this.position.y + this.image.height;
    }
    public left(): number {
        return this.position.x;
    }
    public right(): number {
        return this.position.x + this.image.width;
    }



}

// Exercice 15
// Mettez en place une méthode protected GameObject.collide(other:GameObject) dans la classe GameObject et sa méthode publique callCollide(other:GameObject), puis implémentez-la dans la classe Alien pour écrire "Miam Miam" dans la console quand il touche le joueur.

// Affichez un message GameOver! via un alert() quand l'alien mange le joueur. // je vais direct au chapitre 11 car je pense pour le collide il y a un code object plus simple











// La méthode GameObject.update permet maintenant à n'importe quel GameObject d'effectuer des actions à chaque frame.

// C'est une partie centrale de notre jeu.

// Effectuer une action à chaque frame
// Nous voulons donner au Player la liberté de mettre à jour sa position à chaque frame du jeu.

// Pour cela, nous allons, comme pour GameObject.start(), créer une méthode protected nommée GameObject.update() qui sera appelée à chaque frame dans le setInterval().

// Dans GameObject.ts

// protected update(){}
// Il faut appeler cette méthode dans le setInterval de la méthode Game.loop(). La méthode GameObject.update() étant protected, il nous faut ajouter une méthode publique pour y accéder depuis Game.



// Laissez la méthode start vide, car ce sera à une classe fille comme Player, Alien ou Laser de la remplir avec les actions qu'elles voudront effectuer.

// Dans le cas de Player, il veut définir sa propre image et sa position en bas au centre de l'écran.

// Implémentez donc la méthode start dans Player.
