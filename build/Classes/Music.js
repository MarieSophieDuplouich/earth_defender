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
    // méthode "static" : ajoute less écouteurs d'évènments
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
            console.log("musique normale du jeu lancée !");
        }
    };
    //musique stoppe
    Music.stopMusic = function () {
        if (this.isPlaying && this.bgMusic) {
            this.bgMusic.pause();
            this.isPlaying = false;
        }
    };
    //musique du boss
    // Ici ça démarre la musique du Boss
    Music.startMusicBoss = function () {
        if (!this.isPlayingBoss && this.bossMusic) {
            this.bossMusic.volume = 0.5;
            this.bossMusic.play();
            this.isPlayingBoss = true;
            console.log("musique du boss du jeu lancée !");
        }
    };
    //musique Boss stoppe
    Music.stopMusicBoss = function () {
        if (this.isPlayingBoss && this.bossMusic) {
            this.bossMusic.pause();
            this.isPlayingBoss = false;
        }
    };
    // quand je tire un missile la musique s'active
    Music.shootMusiquesLaser = function () {
        if (this.shootMusicsound) {
            this.shootMusicsound.currentTime = 0; // redémarre le son
            this.shootMusicsound.volume = 0.5;
            this.shootMusicsound.play();
        }
    };
    Music.bossMusic = document.getElementById('boss-music');
    Music.bgMusic = document.getElementById('bg-music');
    Music.isPlaying = false;
    Music.isPlayingBoss = false;
    Music.shootMusicsound = document.getElementById('shoot-music');
    return Music;
}());
export { Music };
// Music.initializeListeners();
//   console.log("music boss du jeu lancée !");
