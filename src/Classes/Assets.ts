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

export class Assets{
    public static getDefaultImage(){
        const image : HTMLImageElement = document.querySelector("img#asset_default");
        if(image == null){
            throw Error("No assets found");
        }
        return image;
    }

    public static getPlayerImage(){
        const image : HTMLImageElement = document.querySelector("img#asset_player");
        if(image == null){
            throw Error("No assets found");
        }
        return image;
    }


// ++
public static getAlienImage() : HTMLImageElement{
    const image: HTMLImageElement = document.querySelector("img#asset_alien");
    if(image == null) throw Error("No alien asset found");

    return image;
}
}


