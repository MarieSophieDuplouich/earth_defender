import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Sol } from "./GameObjects/Sol.js";
import { Boss } from "./GameObjects/Boss.js";
import { Input } from "./Input.js";
import { Music } from "./Music.js";
import { CollisionGrid } from "./CollisionGrid.js";

// Réglages du jeu (faciles à modifier ici)
const NB_ALIENS = 10;
const NB_STARS = 100;
const EARTH_LIVES = 3;
const PLAYER_LIVES = 1;
const BOSS_LIVES = 100;
// Taille d'une tile de la grille de collisions : un peu plus grande que les plus gros objets
const TILE_SIZE = 100;
// Le jeu avance par pas de 10 ms (100 mises à jour par seconde), quelle que soit la fréquence de l'écran
const STEP_MS = 10;

export class Game {

    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;

    private context: CanvasRenderingContext2D;
    private grid: CollisionGrid = new CollisionGrid(this.CANVAS_WIDTH, this.CANVAS_HEIGHT, TILE_SIZE);

    // Tous les GameObject doivent être dans ce tableau pour être mis à jour et dessinés
    private gameObjects: GameObject[] = [];
    private player!: Player;

    // Niveau 1 : les aliens. Niveau 2 : le boss.
    private alienLives: number = NB_ALIENS;
    private earthLives: number = EARTH_LIVES;
    private playerLives: number = PLAYER_LIVES;
    private bossLives: number = BOSS_LIVES;
    private bossSpawned: boolean = false;

    private gameEnded: boolean = false;
    private victory: boolean = false;
    private wasPaused: boolean = false;

    // Pour la boucle à pas fixe
    private lastTime: number = 0;
    private accumulator: number = 0;

    constructor() {
        const canvas = document.querySelector<HTMLCanvasElement>("canvas#jeu");
        if (canvas === null) {
            throw new Error("Canvas introuvable");
        }
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        const context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Contexte 2D indisponible");
        }
        this.context = context;
    }

    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    public destroy(gameObject: GameObject): void {
        gameObject.markDestroyed();
        this.gameObjects = this.gameObjects.filter(go => go !== gameObject);
    }

    public getPlayer(): Player {
        return this.player;
    }

    // ---------- Vies et fin de partie ----------

    public over(): void {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.victory = false;
        Music.stop();
    }

    public loseEarthLife(): void {
        if (this.gameEnded) return;
        this.earthLives--;
        if (this.earthLives <= 0) {
            this.over();
        }
    }

    public losePlayerLife(): void {
        if (this.gameEnded) return;
        this.playerLives--;
        if (this.playerLives <= 0) {
            this.over();
        }
    }

    public loseAlienLife(): void {
        if (this.gameEnded) return;
        this.alienLives--;
    }

    public loseBossLife(): void {
        if (this.gameEnded) return;
        this.bossLives--;
        if (this.bossLives <= 0) {
            this.gameEnded = true;
            this.victory = true;
            Music.stop();
        }
    }

    // ---------- Démarrage ----------

    public start(): void {
        Music.init();
        Input.listen();
        Music.play("niveau1");

        // L'ordre compte : le premier instancié est dessiné en premier (donc derrière les autres)
        for (let i = 0; i < NB_STARS; i++) {
            this.instanciate(new Star(this));
        }
        this.instanciate(new Sol(this));
        this.player = new Player(this);
        this.instanciate(this.player);
        for (let i = 0; i < NB_ALIENS; i++) {
            this.instanciate(new Alien(this));
        }

        requestAnimationFrame((time) => {
            this.lastTime = time;
            this.loop(time);
        });
    }

    // ---------- Boucle de jeu ----------

    private loop(time: number): void {
        // On limite le temps écoulé (ex : onglet resté en arrière-plan) pour ne pas tout rattraper d'un coup
        this.accumulator += Math.min(time - this.lastTime, 100);
        this.lastTime = time;

        while (this.accumulator >= STEP_MS) {
            this.update();
            this.accumulator -= STEP_MS;
        }
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    private update(): void {
        if (this.gameEnded) {
            if (Input.consumeRestart()) {
                window.location.reload();
            }
            return;
        }

        // Pause : on coupe la musique une seule fois, puis on la reprend (niveau 1 ou boss)
        const isPaused = Input.getPause();
        if (isPaused !== this.wasPaused) {
            this.wasPaused = isPaused;
            if (isPaused) {
                Music.pause();
            } else {
                Music.resume();
            }
        }
        if (isPaused) return;

        // Niveau 2 : le boss arrive quand tous les aliens sont partis
        if (this.alienLives <= 0 && !this.bossSpawned) {
            this.bossSpawned = true;
            this.instanciate(new Boss(this));
            Music.play("boss");
        }

        // 1) mise à jour de chaque objet (sur une copie : un objet peut en détruire ou en créer un autre)
        for (const go of [...this.gameObjects]) {
            if (!go.isDestroyed()) {
                go.callUpdate();
            }
        }

        // 2) collisions
        this.checkCollisions();
    }

    // Collisions avec la grille de tiles : chaque objet n'est comparé qu'à ses voisins
    private checkCollisions(): void {
        this.grid.clear();
        for (const go of this.gameObjects) {
            if (go.isCollidable()) {
                this.grid.add(go);
            }
        }

        for (const go of [...this.gameObjects]) {
            if (!go.isCollidable()) continue;

            for (const other of this.grid.getNeighbours(go)) {
                // go peut avoir été détruit par une collision précédente
                if (go.isDestroyed()) break;
                if (!other.isDestroyed() && go.overlap(other)) {
                    go.callCollide(other);
                }
            }
        }
    }

    // ---------- Affichage ----------

    private render(): void {
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        for (const go of this.gameObjects) {
            this.draw(go);
        }
        this.drawHud();

        if (this.gameEnded) {
            this.drawEndScreen();
        } else if (Input.getPause()) {
            this.drawPause();
        }
    }

    private draw(gameObject: GameObject): void {
        this.context.drawImage(
            gameObject.getImage(),
            Math.round(gameObject.getPosition().x),
            Math.round(gameObject.getPosition().y),
            gameObject.getWidth(),
            gameObject.getHeight()
        );
    }

    private drawHud(): void {
        this.context.fillStyle = "white";
        this.context.font = "24px Arial";

        this.context.textAlign = "left";
        this.context.fillText(`${Math.max(0, this.earthLives)} 🌍`, 340, 530);
        this.context.fillText(`${Math.max(0, this.alienLives)} 🛸`, 30, 90);

        this.context.textAlign = "right";
        this.context.fillText(`${Math.max(0, this.playerLives)} 🪖⚔️`, 530, 530);
        this.context.fillText(`${Math.max(0, this.bossLives)} 👹`, 840, 90);
    }

    private drawPause(): void {
        this.context.fillStyle = "rgba(0,0,0,0.5)";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "white";
        this.context.font = "48px Arial";
        this.context.textAlign = "center";
        this.context.fillText("PAUSE", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    }
    // Écrit un texte centré, en réduisant la police si le texte est trop large pour le canvas
    private drawFittedText(texte: string, x: number, y: number, taillePolice: number): void {
        const largeurMax = this.CANVAS_WIDTH - 40; // 20px de marge de chaque côté
        let taille = taillePolice;
        this.context.font = `${taille}px Arial`;

        while (this.context.measureText(texte).width > largeurMax && taille > 12) {
            taille -= 2;
            this.context.font = `${taille}px Arial`;
        }
        this.context.fillText(texte, x, y);
    }

    private drawEndScreen(): void {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "white";
        this.context.textAlign = "center";

        const centreX = this.CANVAS_WIDTH / 2;
        const centreY = this.CANVAS_HEIGHT / 2;

        const titre = this.victory
            ? "VICTORY FOR HUMANS 🪖⚔️🎖️🪖🎖️💪 🎉"
            : "GAME OVER 💀 VICTORY FOR ALIENS 🛸";

        this.drawFittedText(titre, centreX, centreY, 48);
        this.drawFittedText("Appuie sur Entrée pour rejouer", centreX, centreY + 50, 20);
    }
}
