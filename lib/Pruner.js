"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PruneStats_1 = require("./PruneStats");
const fs = require("fs-extra");
const path = require("path");
const Walker_1 = require("./Walker");
class Pruner {
    constructor() { }
    prune() {
        return __awaiter(this, void 0, void 0, function* () {
            const pruneStats = new PruneStats_1.PruneStats();
            yield Walker_1.walk('node_modules', (p, s) => __awaiter(this, void 0, void 0, function* () {
                pruneStats.filesTotal++;
                if (!this.prunable(p, s))
                    return;
                console.log('prune: ' + p);
                if (s.isDirectory()) {
                    const ds = yield this.dirStat(p);
                    pruneStats.filesRemoved += ds.filesRemoved;
                    pruneStats.filesTotal += ds.filesTotal;
                    // pruneStats.sizeRemoved += ds.sizeRemoved;
                }
                yield fs.remove(p);
                pruneStats.filesRemoved++;
                pruneStats.sizeRemoved += s.size;
            }));
            return pruneStats;
        });
    }
    prunable(p, stat) {
        return stat.isFile() && path.extname(p) === '.md';
    }
    dirStat(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirStat = new PruneStats_1.PruneStats();
            yield Walker_1.walk(p, (p, s) => __awaiter(this, void 0, void 0, function* () {
                dirStat.filesTotal++;
                dirStat.filesRemoved++;
                // dirStat.sizeRemoved += s.size;
            }));
            return dirStat;
        });
    }
}
exports.Pruner = Pruner;
