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



class Music {
    static bgMusic: HTMLAudioElement = document.getElementById('bg-music') as HTMLAudioElement;
    static isPlaying: boolean = false;

    // méthode "static" : ajoute less écoutezurs d'évènments

    static initializeListeners() {
        document.addEventListener('click', () => this.startMusic());
        document.addEventListener('keydown', () => this.startMusic());

    }

    // Ici ça démarre la musique
    static startMusic() {
        if (!this.isPlaying && this.bgMusic) {
            this.bgMusic.volume = 0.5;
            this.bgMusic.play();
            this.isPlaying = true;
            console.log("music normale du jeu lancée !");

        }

    }

    //musique stoppe
      static stopMusic() {
        if (!this.isPlaying && this.bgMusic) {
            this.bgMusic.pause();
            this.isPlaying = false;
            console.log("music normale du jeu stoppe !");

        }

    }
    //musique du boss



}

Music.initializeListeners();

//   console.log("music boss du jeu lancée !");