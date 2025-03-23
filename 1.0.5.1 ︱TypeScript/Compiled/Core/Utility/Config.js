"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = require("fs");
class Config {
    static Initialize() {
        const file = fs_1.readFileSync(`${__dirname}\\..\\..\\Configuration.jsonc`, "utf-8");
        this._configuration = JSON.parse(file);
        this.Token = this._configuration["Token"];
        this.ConnectionString = this._configuration["ConnectionString"];
    }
    static FetchVia(client) {
        this.Prefixes = this._configuration["Prefixes"];
        this.Language = this._configuration["Language"];
        this.Colors = this._configuration["Colors"];
        this.ServerLink = this._configuration["ServerLink"];
        const files = fs_1.readdirSync(`${__dirname}\\..\\..\\Assets\\Text`);
        for (let i in files) {
            const file = fs_1.readFileSync(`${__dirname}\\..\\..\\Assets\\Text\\${files[i]}`, "utf8");
            const language = files[i].substring(0, 5);
            const json = JSON.parse(file);
            this.BotStrings[language] = json;
        }
        const ownerId = this._configuration["Owner"];
        const betaTesters = this._configuration["BetaTesters"];
        this.Owner = client.users.cache.get(ownerId);
        for (let i in betaTesters)
            this.BetaTesters[i] = client.users.cache.get(betaTesters[i]);
    }
}
exports.Config = Config;
Config.BetaTesters = [];
Config.BotStrings = {};
