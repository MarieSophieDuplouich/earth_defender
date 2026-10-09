import { Assets } from "./Assets.js";

export type Piste = "niveau1" | "boss";

const VOLUME = 0.5;

// Music s'occupe de tous les sons du jeu : une musique par niveau + le bruit du laser.
export class Music {

    private static levelMusic: HTMLAudioElement;
    private static bossMusic: HTMLAudioElement;
    private static laserSound: HTMLAudioElement;

    // Piste qui doit être jouée en ce moment (null = silence)
    private static pisteActive: Piste | null = null;
    private static enPause: boolean = false;
    // Les navigateurs interdisent le son tant que le joueur n'a pas cliqué ou appuyé sur une touche
    private static debloquee: boolean = false;

    public static init(): void {
        Music.levelMusic = Assets.getLevelMusic();
        Music.bossMusic = Assets.getBossMusic();
        Music.laserSound = Assets.getLaserSound();

        // Le son est autorisé dès la première interaction du joueur
        const debloquer = () => Music.debloquer();
        window.addEventListener("keydown", debloquer);
        window.addEventListener("pointerdown", debloquer);
    }

    // Lance la musique d'un niveau (et arrête l'autre)
    public static play(piste: Piste): void {
        Music.arreterTout();
        Music.pisteActive = piste;
        Music.enPause = false;
        Music.lireLaPisteActive();
    }

    public static pause(): void {
        Music.enPause = true;
        Music.levelMusic.pause();
        Music.bossMusic.pause();
    }

    // Reprend la bonne musique après une pause (niveau 1 OU boss)
    public static resume(): void {
        Music.enPause = false;
        Music.lireLaPisteActive();
    }

    public static stop(): void {
        Music.pisteActive = null;
        Music.arreterTout();
    }

    public static playLaser(): void {
        Music.laserSound.currentTime = 0;
        Music.laserSound.volume = VOLUME;
        Music.laserSound.play().catch((erreur) => console.warn("Son du laser impossible :", erreur));
    }

    private static debloquer(): void {
        if (Music.debloquee) return;
        Music.debloquee = true;
        Music.lireLaPisteActive();
    }

    private static arreterTout(): void {
        Music.levelMusic.pause();
        Music.levelMusic.currentTime = 0;
        Music.bossMusic.pause();
        Music.bossMusic.currentTime = 0;
    }

    private static lireLaPisteActive(): void {
        if (Music.pisteActive === null || Music.enPause || !Music.debloquee) {
            return;
        }
        const audio = Music.pisteActive === "boss" ? Music.bossMusic : Music.levelMusic;
        audio.volume = VOLUME;
        // play() renvoie une promesse, refusée si le navigateur bloque le son
        audio.play().catch((erreur) => console.warn("Musique impossible :", erreur));
    }
}
