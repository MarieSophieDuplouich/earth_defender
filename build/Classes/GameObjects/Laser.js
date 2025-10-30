var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Laser.prototype.start = function () {
        //laser/ missiles position????
        this.setImage(Assets.getLaserImage());
        this.setPosition({
            x: 0,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height + 10
        });
    };
    Laser.prototype.update = function () {
        // Le sol est fixe, donc rien ici
    };
    return Laser;
}(GameObject));
export { Laser };
