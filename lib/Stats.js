"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stats = /** @class */ (function () {
    function Stats() {
        this.filesTotal = 0;
        this.filesRemoved = 0;
        this.sizeRemoved = 0;
    }
    Stats.prototype.clear = function () {
        this.filesTotal = 0;
        this.filesRemoved = 0;
        this.sizeRemoved = 0;
    };
    return Stats;
}());
exports.Stats = Stats;
