export type Direction = 0 | 1 | -1;

// Input s'occupe du clavier (comme Assets s'occupe des images).
// On garde la liste des touches actuellement enfoncées : plus fiable qu'une variable par touche
// (ex : appuyer sur d puis q, relâcher q => on continue d'aller à droite).
export class Input {

    private static touches: Set<string> = new Set();
    private static isPaused: boolean = false;
    private static restartDemande: boolean = false;

    // d / q (clavier AZERTY) ou flèches droite / gauche
    public static getAxisX(): Direction {
        const droite = Input.touches.has("d") || Input.touches.has("arrowright");
        const gauche = Input.touches.has("q") || Input.touches.has("arrowleft");
        return ((droite ? 1 : 0) - (gauche ? 1 : 0)) as Direction;
    }

    // Barre d'espace maintenue = le joueur veut tirer
    public static getIsShooting(): boolean {
        return Input.touches.has(" ");
    }

    public static getPause(): boolean {
        return Input.isPaused;
    }

    // Renvoie true une seule fois après un appui sur Entrée
    public static consumeRestart(): boolean {
        const demande = Input.restartDemande;
        Input.restartDemande = false;
        return demande;
    }

    public static listen(): void {
        window.addEventListener("keydown", (event) => {
            const touche = event.key.toLowerCase();

            // Empêche la page de défiler avec l'espace et les flèches
            if (touche === " " || touche === "arrowleft" || touche === "arrowright") {
                event.preventDefault();
            }

            Input.touches.add(touche);

            if (event.repeat) {
                return;
            }
            if (touche === "p") {
                Input.isPaused = !Input.isPaused;
            }
            if (touche === "enter") {
                Input.restartDemande = true;
            }
        });

        window.addEventListener("keyup", (event) => {
            Input.touches.delete(event.key.toLowerCase());
        });

        // Si la fenêtre perd le focus on n'entend plus les keyup : on oublie les touches
        window.addEventListener("blur", () => {
            Input.touches.clear();
        });
    }
}
