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

export class Input{
    private static axisX : Direction = 0;
    // +
    public static getAxisX() : Direction{
        return this.axisX;
    }
    public static listen(){
          window.addEventListener("keydown", (event) => {
        switch (event.key) {
          
            case "d":
            case "D":
                Input.axisX = 1;
                break;
            
            case "q":
            case "Q":
              Input.axisX = -1;
                break;
            default:
                break;
        }
    });

        window.addEventListener("keyup", (event) => {
        switch (event.key) {
            
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

    }
}
export type Direction = 0 | 1 | -1;



//ajouter P comme pause
//
//     const missileImg: HTMLImageElement = document.querySelector("img.missile");
//     const missiles: GameObject[] = [];

//varaibale du jeu 

//     const missiles: GameObject[] = [];



//         // Missiles
//         for (let i = missiles.length - 1; i >= 0; i--) {
//             const missile = missiles[i];
//             missile.position.y -= 8;
//             context.drawImage(
//                 missile.image,
//                 missile.position.x,
//                 missile.position.y,
//                 missile.image.width,
//                 missile.image.height
//             );

//             // Supprimer les missiles sortis du haut
//             if (missile.position.y + missile.image.height < 0) {
//                 missiles.splice(i, 1);
//             }


//         }


//     // --- Gestion des touches --- /


//     // quand je tire un missile la musique s'active

//     const shootMusicsound = document.getElementById('shoot-music') as HTMLAudioElement;
//     function shootMusiques() {
//         if (shootMusicsound.paused) {
//             shootMusicsound.currentTime = 0;
//             shootMusicsound.volume = 0.5;
//             shootMusicsound.play();
//         } else {

//             shootMusicsound.currentTime = 0;
//         }

//         document.addEventListener('keydown', shootMusiques);
//     }

//     document.addEventListener("keydown", (event) => {
//         if (gameOver) return; // Bloque le contrôle après game over

//         switch (event.key) {
//             case "d":
//             case "D":
//                 direction = 1;
//                 break;
//             case "q":
//             case "Q":
//                 direction = -1;
//                 break;
//             case " ":
//                 // Tirer un missile
//                 missiles.push(new GameObject(
//                     missileImg,
//                     {
//                         x: playerPos.x + playerImg.width / 2 - missileImg.width / 2,
//                         y: playerPos.y - missileImg.height
//                     }
//                 ));
//                 shootMusiques();
//                 break;
//         }
//     });

//     document.addEventListener("keyup", (event) => {
//         if (["d", "D", "q", "Q"].includes(event.key)) {
//             direction = 0;
//         }
//     });
// }

