import { Assets } from "../Assets.js";
// Un GameObject = un élément du jeu : une position, une image, une taille.
// Les attributs sont privés, les classes filles passent par les getters / setters.
export class GameObject {
    constructor(game) {
        this.position = { x: 0, y: 0 };
        this.destroyed = false;
        this.game = game;
        this.image = Assets.getDefaultImage();
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.start();
    }
    getImage() {
        return this.image;
    }
    getPosition() {
        return this.position;
    }
    getGame() {
        return this.game;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    // Changer d'image remet l'objet à la taille de cette image
    setImage(image) {
        this.image = image;
        this.width = image.naturalWidth;
        this.height = image.naturalHeight;
    }
    setPosition(position) {
        this.position = position;
    }
    // Change la largeur en gardant les proportions de l'image
    setWidth(width) {
        this.height = this.height * (width / this.width);
        this.width = width;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    // Un objet détruit ne doit plus réagir aux collisions (évite qu'un alien touché
    // par deux lasers dans la même frame soit compté deux fois)
    isDestroyed() {
        return this.destroyed;
    }
    markDestroyed() {
        this.destroyed = true;
    }
    // Par défaut un GameObject peut entrer en collision. Les décors (étoiles, sol) disent non.
    isCollidable() {
        return true;
    }
    // Les classes filles (Player, Alien, Laser...) remplissent ces méthodes si besoin
    start() { }
    update() { }
    collide(other) { }
    callUpdate() {
        this.update();
    }
    callCollide(other) {
        this.collide(other);
    }
    // Les 4 bords du rectangle de l'objet
    top() {
        return this.position.y;
    }
    bottom() {
        return this.position.y + this.height;
    }
    left() {
        return this.position.x;
    }
    right() {
        return this.position.x + this.width;
    }
    // Collision entre deux rectangles (AABB), comme dans le tuto :
    // les rectangles se touchent si leurs "x" se chevauchent ET si leurs "y" se chevauchent.
    // Les signes sont stricts (< et >) : deux rectangles juste collés ne se touchent pas.
    overlap(other) {
        const xOverlaps = this.left() < other.right() && this.right() > other.left();
        const yOverlaps = this.top() < other.bottom() && this.bottom() > other.top();
        return xOverlaps && yOverlaps;
    }
}
