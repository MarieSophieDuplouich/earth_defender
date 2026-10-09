import { Position } from "../Position.js";
import type { Game } from "../Game.js";
import { Assets } from "../Assets.js";

// Un GameObject = un élément du jeu : une position, une image, une taille.
// Les attributs sont privés, les classes filles passent par les getters / setters.
export class GameObject {

    private position: Position = { x: 0, y: 0 };
    private image: HTMLImageElement;
    private width: number;
    private height: number;
    private game: Game;
    private destroyed: boolean = false;

    constructor(game: Game) {
        this.game = game;
        this.image = Assets.getDefaultImage();
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.start();
    }

    public getImage(): HTMLImageElement {
        return this.image;
    }
    public getPosition(): Position {
        return this.position;
    }
    public getGame(): Game {
        return this.game;
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }

    // Changer d'image remet l'objet à la taille de cette image
    public setImage(image: HTMLImageElement): void {
        this.image = image;
        this.width = image.naturalWidth;
        this.height = image.naturalHeight;
    }
    public setPosition(position: Position): void {
        this.position = position;
    }
    // Change la largeur en gardant les proportions de l'image
    public setWidth(width: number): void {
        this.height = this.height * (width / this.width);
        this.width = width;
    }
    public setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    // Un objet détruit ne doit plus réagir aux collisions (évite qu'un alien touché
    // par deux lasers dans la même frame soit compté deux fois)
    public isDestroyed(): boolean {
        return this.destroyed;
    }
    public markDestroyed(): void {
        this.destroyed = true;
    }

    // Par défaut un GameObject peut entrer en collision. Les décors (étoiles, sol) disent non.
    public isCollidable(): boolean {
        return true;
    }

    // Les classes filles (Player, Alien, Laser...) remplissent ces méthodes si besoin
    protected start(): void { }
    protected update(): void { }
    protected collide(other: GameObject): void { }

    public callUpdate(): void {
        this.update();
    }
    public callCollide(other: GameObject): void {
        this.collide(other);
    }

    // Les 4 bords du rectangle de l'objet
    public top(): number {
        return this.position.y;
    }
    public bottom(): number {
        return this.position.y + this.height;
    }
    public left(): number {
        return this.position.x;
    }
    public right(): number {
        return this.position.x + this.width;
    }

    // Collision entre deux rectangles (AABB), comme dans le tuto :
    // les rectangles se touchent si leurs "x" se chevauchent ET si leurs "y" se chevauchent.
    // Les signes sont stricts (< et >) : deux rectangles juste collés ne se touchent pas.
    public overlap(other: GameObject): boolean {
        const xOverlaps = this.left() < other.right() && this.right() > other.left();
        const yOverlaps = this.top() < other.bottom() && this.bottom() > other.top();
        return xOverlaps && yOverlaps;
    }
}
