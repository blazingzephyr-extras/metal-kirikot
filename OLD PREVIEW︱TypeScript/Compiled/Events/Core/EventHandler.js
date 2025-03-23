"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const fs_1 = require("fs");
class EventHandler {
    static Initialize(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs_1.readdirSync(`${__dirname}/../Events`);
            for (let i in files) {
                var cli = yield Promise.resolve().then(() => require(`../Events/${files[i]}`));
                client.on(cli.event.Event, cli.event.Function);
            }
        });
    }
}
exports.EventHandler = EventHandler;
