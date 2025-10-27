// Notre jeu contiendra de nombreux assets graphiques. En POO chaque classe a sa propre responsabilité ; 
// il faut donc créer une classe Assets qui gère les assets graphiques.
export class Assets{
    public static getDefaultImage(){
        const image : HTMLImageElement = document.querySelector("img#asset_default");
        if(image == null){
            throw Error("No assets found");
        }
        return image;
    }
}