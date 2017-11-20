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
const fs = require("fs-extra");
function walk(dir, prunerF) {
    return __awaiter(this, void 0, void 0, function* () {
        let s = yield fs.lstat(dir);
        if (!s.isDirectory())
            return;
        const items = yield fs.readdir(dir);
        for (let item of items) {
            const s = yield fs.lstat(item);
            prunerF(item, s);
            if (s.isDirectory())
                walk(item, prunerF);
        }
    });
}
exports.walk = walk;
