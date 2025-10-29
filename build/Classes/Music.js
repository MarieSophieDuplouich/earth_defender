//  j'ai mis la musique en méthode privé car la musique une fois installée on n'y touche plus
//je ne veux pas par exemple qu'un autre développeur la change (exemple fictif)
//j'ai créé  Music.ts car je pense que c'est un GameObject qu'on doit mettre à part
// javascript ancien code
// <script>
//     // Démarrage de la musique au premier clic ou touche
//     const bgMusic = document.getElementById('bg-music');
//     function startMusic() {
//         if (bgMusic.paused) {
//             bgMusic.volume = 0.5; // ajuster le volume
//             bgMusic.play();
//         }
//         document.removeEventListener('keydown', startMusic);
//         document.removeEventListener('click', startMusic);
//     }
//     document.addEventListener('keydown', startMusic);
//     document.addEventListener('click', startMusic);
// </script>
// si on voit un any dans un projet typescript ce n'est pas bon signe il faut l'enlever 
// la musique doit être en mode StaticRangevoir si les listenrs y en a pas d'autres
var Music = /** @class */ (function () {
    function Music() {
    }
    // méthode privée : ajoute less écoutezurs d'évènments
    Music.initializeListeners = function () {
        var _this = this;
        document.addEventListener('click', function () { return _this.startMusic(); });
        document.addEventListener('keydown', function () { return _this.startMusic(); });
    };
    // Ici ça démarre la musique
    Music.startMusic = function () {
        if (!this.isPlaying && this.bgMusic) {
            this.bgMusic.volume = 0.5;
            this.bgMusic.play();
            this.isPlaying = true;
            console.log("music normale du jeu lancée !");
            console.log("music boss du jeu lancée !");
        }
    };
    Music.bgMusic = document.getElementById('bg-music');
    Music.isPlaying = false;
    return Music;
}());
