import { Assets } from "./Assets.js";
const VOLUME = 0.5;
// Music s'occupe de tous les sons du jeu : une musique par niveau + le bruit du laser.
export class Music {
    static init() {
        Music.levelMusic = Assets.getLevelMusic();
        Music.bossMusic = Assets.getBossMusic();
        Music.laserSound = Assets.getLaserSound();
        // Le son est autorisé dès la première interaction du joueur
        const debloquer = () => Music.debloquer();
        window.addEventListener("keydown", debloquer);
        window.addEventListener("pointerdown", debloquer);
    }
    // Lance la musique d'un niveau (et arrête l'autre)
    static play(piste) {
        Music.arreterTout();
        Music.pisteActive = piste;
        Music.enPause = false;
        Music.lireLaPisteActive();
    }
    static pause() {
        Music.enPause = true;
        Music.levelMusic.pause();
        Music.bossMusic.pause();
    }
    // Reprend la bonne musique après une pause (niveau 1 OU boss)
    static resume() {
        Music.enPause = false;
        Music.lireLaPisteActive();
    }
    static stop() {
        Music.pisteActive = null;
        Music.arreterTout();
    }
    static playLaser() {
        Music.laserSound.currentTime = 0;
        Music.laserSound.volume = VOLUME;
        Music.laserSound.play().catch((erreur) => console.warn("Son du laser impossible :", erreur));
    }
    static debloquer() {
        if (Music.debloquee)
            return;
        Music.debloquee = true;
        Music.lireLaPisteActive();
    }
    static arreterTout() {
        Music.levelMusic.pause();
        Music.levelMusic.currentTime = 0;
        Music.bossMusic.pause();
        Music.bossMusic.currentTime = 0;
    }
    static lireLaPisteActive() {
        if (Music.pisteActive === null || Music.enPause || !Music.debloquee) {
            return;
        }
        const audio = Music.pisteActive === "boss" ? Music.bossMusic : Music.levelMusic;
        audio.volume = VOLUME;
        // play() renvoie une promesse, refusée si le navigateur bloque le son
        audio.play().catch((erreur) => console.warn("Musique impossible :", erreur));
    }
}
// Piste qui doit être jouée en ce moment (null = silence)
Music.pisteActive = null;
Music.enPause = false;
// Les navigateurs interdisent le son tant que le joueur n'a pas cliqué ou appuyé sur une touche
Music.debloquee = false;
