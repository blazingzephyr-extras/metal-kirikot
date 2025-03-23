"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotStrings = exports.Config = void 0;
const fs_1 = require("fs");
let BotStrings = {};
exports.BotStrings = BotStrings;
class Config {
    static Load() {
        const file = fs_1.readFileSync(`${__dirname}/../../../Configuration.json`, { encoding: 'utf-8', flag: 'r' });
        const configuration = JSON.parse(file);
        this.Token = configuration['Token'];
        this.DatabaseConnection = configuration['DatabaseConnection'];
        this.Prefixes = configuration['Prefixes'];
        this.Colors = configuration['Colors'];
        this.Server = configuration['Server'];
        this._ownerId = configuration['Owner'];
        this._betaTestersIds = configuration['BetaTesters'];
        const textFiles = fs_1.readdirSync(`${__dirname}/../../../Assets/Languages/`);
        for (let i in textFiles) {
            const textFile = fs_1.readFileSync(`${__dirname}/../../../Assets/Languages/${textFiles[i]}`, { encoding: 'utf8', flag: 'r' });
            const language = textFiles[i].substring(0, 5);
            const json = JSON.parse(textFile);
            BotStrings[language] = json;
        }
    }
    static FetchVia(client) {
        this.Owner = client.users.resolve(this._ownerId);
        for (let i in this._betaTestersIds)
            this.BetaTesters[i] = client.users.resolve(this._betaTestersIds[i]);
    }
}
exports.Config = Config;
Config.BetaTesters = [];
