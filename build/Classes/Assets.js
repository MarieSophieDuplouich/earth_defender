// Notre jeu contiendra de nombreux assets graphiques. En POO chaque classe a sa propre responsabilité ; 
// il faut donc créer une classe Assets qui gère les assets graphiques.
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
    return Assets;
}());
export { Assets };
