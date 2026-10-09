// Assets est une façade : elle va chercher les images et les sons dans la page (index.html).
// Ses méthodes sont static, on ne l'instancie jamais.
// Si un asset est introuvable on lance une erreur (throw) plutôt que de renvoyer null.
export class Assets {

    private static trouverImage(id: string): HTMLImageElement {
        const image = document.querySelector<HTMLImageElement>(`img#${id}`);
        if (image === null) {
            throw new Error(`Image introuvable : ${id}`);
        }
        // Une image qui n'a pas pu se charger a une largeur de 0 : on préfère le savoir tout de suite
        if (!image.complete || image.naturalWidth === 0) {
            throw new Error(`Image non chargée : ${id}`);
        }
        return image;
    }

    private static trouverAudio(id: string): HTMLAudioElement {
        const audio = document.querySelector<HTMLAudioElement>(`audio#${id}`);
        if (audio === null) {
            throw new Error(`Son introuvable : ${id}`);
        }
        return audio;
    }

    // Images
    public static getDefaultImage(): HTMLImageElement { return Assets.trouverImage("asset_default"); }
    public static getPlayerImage(): HTMLImageElement { return Assets.trouverImage("asset_player"); }
    public static getAlienImage(): HTMLImageElement { return Assets.trouverImage("asset_alien"); }
    public static getBossImage(): HTMLImageElement { return Assets.trouverImage("asset_boss"); }
    public static getStarImage(): HTMLImageElement { return Assets.trouverImage("asset_star"); }
    public static getSolImage(): HTMLImageElement { return Assets.trouverImage("asset_sol"); }
    public static getLaserImage(): HTMLImageElement { return Assets.trouverImage("asset_laser"); }
    public static getBossLaserImage(): HTMLImageElement { return Assets.trouverImage("asset_boss_laser"); }

    // Sons
    public static getLevelMusic(): HTMLAudioElement { return Assets.trouverAudio("musique-niveau1"); }
    public static getBossMusic(): HTMLAudioElement { return Assets.trouverAudio("musique-boss"); }
    public static getLaserSound(): HTMLAudioElement { return Assets.trouverAudio("son-laser"); }
}
