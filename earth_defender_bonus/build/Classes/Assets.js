// Notre jeu contiendra de nombreux assets graphiques. 
// En POO chaque classe a sa propre responsabilité ; il faut donc créer une classe Assets qui gère les assets graphiques.
// /src/Classes/Assets.ts
// Notez que nous provoquons une erreur si l'image n'est pas trouvée. 
// La bonne pratique veut que l'on privilégie throw en cas d'erreur plutôt qu'une valeur de retour comme null ou false.
// Assets n'est qu'une façade pour récupérer des données, 
// à l'inverse de GameObject qui représente un élément du jeu. 
// Je ne vais donc jamais directement instancier la classe Assets, ses méthodes sont donc static. 
// Une méthode static est accessible directement en tant qu'attribut de la classe. Pas besoin donc de l'instancier avec new.
// Une fois la fonction getter ajoutée, je peux m'en servir dans le constructeur de GameObject.
var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.getDefaultImage = function () {
        var image = document.querySelector("img#asset_default");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    // Player
    Assets.getPlayerImage = function () {
        var image = document.querySelector("img#asset_player");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    // Alien
    Assets.getAlienImage = function () {
        var image = document.querySelector("img#asset_alien");
        if (image == null)
            throw Error("No alien asset found");
        return image;
    };
    //étoiles
    Assets.getStarImage = function () {
        var image = document.querySelector("img.star");
        if (image == null)
            throw Error("No star asset found");
        return image;
    };
    //Boss
    Assets.getBossImage = function () {
        var image = document.querySelector("img.boss");
        if (image == null)
            throw Error("No boss asset found");
        return image;
    };
    //Sol
    Assets.getSolImage = function () {
        var image = document.querySelector("img.sol");
        if (image == null)
            throw Error("No ground asset found");
        return image;
    };
    //Misiles/laser
    Assets.getLaserImage = function () {
        var image = document.querySelector("img.missile");
        if (image == null)
            throw Error("No ground asset found");
        return image;
    };
    // Ici je ne sais pas où mettre l'audio    // quand je tire un missile la musique s'active
    Assets.getshootMusicsound = function () {
        var audio = document.querySelector("audio#shoot-music");
        if (audio == null)
            throw Error("No laser sound asset found");
        return audio;
    };
    return Assets;
}());
export { Assets };
