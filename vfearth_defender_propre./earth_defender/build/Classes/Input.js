// Input s'occupe du clavier (comme Assets s'occupe des images).
// On garde la liste des touches actuellement enfoncées : plus fiable qu'une variable par touche
// (ex : appuyer sur d puis q, relâcher q => on continue d'aller à droite).
export class Input {
    // d / q (clavier AZERTY) ou flèches droite / gauche
    static getAxisX() {
        const droite = Input.touches.has("d") || Input.touches.has("arrowright");
        const gauche = Input.touches.has("q") || Input.touches.has("arrowleft");
        return ((droite ? 1 : 0) - (gauche ? 1 : 0));
    }
    // Barre d'espace maintenue = le joueur veut tirer
    static getIsShooting() {
        return Input.touches.has(" ");
    }
    static getPause() {
        return Input.isPaused;
    }
    // Renvoie true une seule fois après un appui sur Entrée
    static consumeRestart() {
        const demande = Input.restartDemande;
        Input.restartDemande = false;
        return demande;
    }
    static listen() {
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
Input.touches = new Set();
Input.isPaused = false;
Input.restartDemande = false;
