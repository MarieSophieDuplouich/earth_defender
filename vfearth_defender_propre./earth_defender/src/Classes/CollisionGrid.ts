import type { GameObject } from "./GameObjects/GameObject.js";

// Grille de tiles posée sur le canvas, pour accélérer les collisions.
// Idée du tuto (jonathanwhiting.com/tutorial/collision, partie "Optimising") :
// au lieu de comparer un objet avec TOUS les autres, on calcule dans quelles tiles il se trouve
// (left_tile, right_tile, top_tile, bottom_tile) et on ne regarde que les objets de ces tiles.
export class CollisionGrid {

    private tileSize: number;
    private nbColumns: number;
    private nbRows: number;
    // tiles[numéro de tile] = liste des objets qui touchent cette tile
    private tiles: GameObject[][] = [];

    constructor(width: number, height: number, tileSize: number) {
        this.tileSize = tileSize;
        this.nbColumns = Math.ceil(width / tileSize);
        this.nbRows = Math.ceil(height / tileSize);
        for (let i = 0; i < this.nbColumns * this.nbRows; i++) {
            this.tiles.push([]);
        }
    }

    // À appeler au début de chaque frame
    public clear(): void {
        for (const tile of this.tiles) {
            tile.length = 0;
        }
    }

    // Range l'objet dans toutes les tiles qu'il recouvre
    public add(gameObject: GameObject): void {
        this.forEachTile(gameObject, (tile) => tile.push(gameObject));
    }

    // Tous les objets qui partagent au moins une tile avec gameObject (sans lui-même, sans doublon).
    // Ce sont les seuls avec qui il peut y avoir collision : on fera overlap() uniquement avec eux.
    public getNeighbours(gameObject: GameObject): Set<GameObject> {
        const neighbours = new Set<GameObject>();
        this.forEachTile(gameObject, (tile) => {
            for (const other of tile) {
                if (other !== gameObject) {
                    neighbours.add(other);
                }
            }
        });
        return neighbours;
    }

    private forEachTile(gameObject: GameObject, action: (tile: GameObject[]) => void): void {
        // Math.floor (et pas une simple division entière) pour bien gérer les positions négatives :
        // un alien qui arrive d'au-dessus du canvas a un y < 0
        let leftTile = Math.floor(gameObject.left() / this.tileSize);
        let rightTile = Math.floor(gameObject.right() / this.tileSize);
        let topTile = Math.floor(gameObject.top() / this.tileSize);
        let bottomTile = Math.floor(gameObject.bottom() / this.tileSize);

        // Objet entièrement en dehors du canvas : invisible, donc pas de collision possible
        if (rightTile < 0 || leftTile > this.nbColumns - 1 || bottomTile < 0 || topTile > this.nbRows - 1) {
            return;
        }

        // Objet à moitié dehors : on le garde dans la grille. Dernier indice valide = nombre de tiles - 1
        if (leftTile < 0) leftTile = 0;
        if (rightTile > this.nbColumns - 1) rightTile = this.nbColumns - 1;
        if (topTile < 0) topTile = 0;
        if (bottomTile > this.nbRows - 1) bottomTile = this.nbRows - 1;

        for (let i = leftTile; i <= rightTile; i++) {
            for (let j = topTile; j <= bottomTile; j++) {
                action(this.tiles[j * this.nbColumns + i]);
            }
        }
    }
}
