// Assets est une façade : elle va chercher les images et les sons dans la page (index.html).
// Ses méthodes sont static, on ne l'instancie jamais.
// Si un asset est introuvable on lance une erreur (throw) plutôt que de renvoyer null.
export class Assets {
    static trouverImage(id) {
        const image = document.querySelector(`img#${id}`);
        if (image === null) {
            throw new Error(`Image introuvable : ${id}`);
        }
        // Une image qui n'a pas pu se charger a une largeur de 0 : on préfère le savoir tout de suite
        if (!image.complete || image.naturalWidth === 0) {
            throw new Error(`Image non chargée : ${id}`);
        }
        return image;
    }
    static trouverAudio(id) {
        const audio = document.querySelector(`audio#${id}`);
        if (audio === null) {
            throw new Error(`Son introuvable : ${id}`);
        }
        return audio;
    }
    // Images
    static getDefaultImage() { return Assets.trouverImage("asset_default"); }
    static getPlayerImage() { return Assets.trouverImage("asset_player"); }
    static getAlienImage() { return Assets.trouverImage("asset_alien"); }
    static getBossImage() { return Assets.trouverImage("asset_boss"); }
    static getStarImage() { return Assets.trouverImage("asset_star"); }
    static getSolImage() { return Assets.trouverImage("asset_sol"); }
    static getLaserImage() { return Assets.trouverImage("asset_laser"); }
    static getBossLaserImage() { return Assets.trouverImage("asset_boss_laser"); }
    // Sons
    static getLevelMusic() { return Assets.trouverAudio("musique-niveau1"); }
    static getBossMusic() { return Assets.trouverAudio("musique-boss"); }
    static getLaserSound() { return Assets.trouverAudio("son-laser"); }
}
