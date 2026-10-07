// Chapitre 6 - Lire les inputs du clavier
// Au même titre que la classe Assets s'occupe des images, la classe Input s'occupe des entrées du clavier.
// Créez un fichier Input.ts dans le dossier /src/Classes et implétémentez-y la classe Input.
// /src/Classes/Input.ts
// // +
// export class Input{
//     }
// Puis ajoutez un nouveau type Direction qui peut prendre trois valeurs : 0, 1 ou -1
// export class Input{
//     }
// // +
// export type Direction = 0 | 1 | -1;
// Puis ajoutez un attribut privé statique axisX de type Direction initialisé à 0
// export class Input{
//     // +
//     private static axisX : Direction = 0;
// }
// export type Direction = 0 | 1 | -1;
// et une méthode statique publique Input.getAxisX() qui renvoie une Direction.
// export class Input{
//     private static axisX : Direction = 0;
//     // +
//     public static getAxisX() : Direction{
//         return this.axisX;
//     }
// }
// export type Direction = 0 | 1 | -1;
// Exercice 8 - Lire les inputs du clavier
// Dans une nouvelle méthode Input.listen(), réagissez aux événements keydown et keyup pour définir la valeur de axisX.
// Si le joueur n'appuie sur aucune touche axisX est égal à 0
// Si le joueur appuie sur d ou D axisX est égal à 1
// Si le joueur appuie sur q ou Q axisX est égal à -1
// Astuce : Utilisez window.addEventListener("keydown", (event) => { ... }) pour écouter les événements clavier. Utilisez event.key pour savoir quelle touche a été pressée. utilisez aussi window.addEventListener("keyup", (event) => { ... }) pour écouter le relâchement des touches.
// /src/Classes/Input.ts
import { Assets } from "./Assets.js";
var Input = /** @class */ (function () {
    function Input() {
    }
    // +
    Input.getAxisX = function () {
        return this.axisX;
    };
    //missile 
    Input.getIsShooting = function () {
        return Input.isShooting;
    };
    // la pause
    Input.getPause = function () {
        return Input.isPaused;
    };
    // public static getshootMusiques(): boolean {
    //     return Input.laserMusic;
    // }
    Input.listen = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "d":
                case "D":
                    Input.axisX = 1;
                    break;
                case "q":
                case "Q":
                    Input.axisX = -1;
                    break;
                //barre d'espace lance un missile
                case " ":
                    Input.isShooting = true;
                    console.log("je tire");
                    _this.laserMusic.currentTime = 0;
                    _this.laserMusic.volume = 0.5;
                    _this.laserMusic.play();
                    console.log("je tire");
                    break;
                //touche p pause enfoncée
                case "p":
                case "P":
                    Input.isPaused = !Input.isPaused; // toggle
                    console.log("Pause:", Input.isPaused);
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", function (event) {
            switch (event.key) {
                case " ":
                    Input.isShooting = false;
                    break;
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0;
                    break;
                default:
                    break;
            }
        });
    };
    Input.axisX = 0;
    Input.isPaused = false;
    Input.isShooting = false;
    // laser missile musique
    // private static laserMusic: boolean = false;
    // public static getshootMusiques(): boolean {
    //     return Input.laserMusic;
    // }
    Input.laserMusic = Assets.getshootMusicsound();
    return Input;
}());
export { Input };
