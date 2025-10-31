import { Alien } from "./GameObjects/Alien.js";


// si on voit un any dans un projet typescript ce n'est pas bon signe il faut l'enlever 



export class Music {
   private static bossMusic: HTMLAudioElement = document.getElementById('boss-music') as HTMLAudioElement;
   private static bgMusic: HTMLAudioElement = document.getElementById('bg-music') as HTMLAudioElement;
   private static isPlaying: boolean = false;
   private static isPlayingBoss: boolean = false;
   private static shootMusicsound : HTMLAudioElement = document.getElementById('shoot-music') as HTMLAudioElement;


    // méthode "static" : ajoute less écouteurs d'évènments

  public static initializeListeners() {
        document.addEventListener('click', () => this.startMusic());
        document.addEventListener('keydown', () => this.startMusic());
    }

    // Ici ça démarre la musique
    public static startMusic() {
        if (!this.isPlaying && this.bgMusic) {
            this.bgMusic.volume = 0.5;
            this.bgMusic.play();
            this.isPlaying = true;
            console.log("musique normale du jeu lancée !");

        }

    }

    //musique stoppe
    public static stopMusic() {
        if (this.isPlaying && this.bgMusic) {
            this.bgMusic.pause();
            this.isPlaying = false;

        }

    }


    //musique du boss

    // Ici ça démarre la musique du Boss
    public static startMusicBoss() {
        if (!this.isPlayingBoss && this.bossMusic) {
            this.bossMusic.volume = 0.5;
            this.bossMusic.play();
            this.isPlayingBoss = true;
            console.log("musique du boss du jeu lancée !");

        }

    }

    //musique Boss stoppe
    public static stopMusicBoss() {
        if (this.isPlayingBoss && this.bossMusic) {
            this.bossMusic.pause();
            this.isPlayingBoss = false;

        }

    }
    // quand je tire un missile la musique s'active

      public static shootMusiquesLaser() {
         if (this.shootMusicsound) {
        this.shootMusicsound.currentTime = 0; // redémarre le son
        this.shootMusicsound.volume = 0.5;
        this.shootMusicsound.play();
    }
    }

}


