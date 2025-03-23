"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = require("fs");
class Config {
    static Initialize() {
        const configuration = (0, fs_1.readFileSync)(`${__dirname}/../../../Config.json`, { encoding: 'utf-8', flag: 'r' });
        const json = JSON.parse(configuration);
        this.OwnerId = json['Owner'];
        this.BetaTestersIds = json['BetaTesters'];
        this.ServerLink = json['ServerLink'];
        this.ConnectionString = json['ConnectionString'];
        this.DefaultPrefixes = json['DefaultPrefixes'];
        this.Tokens = json['Tokens'];
        this.Colors = json['Colors'];
    }
    static FinishInitializing(client) {
        this.Owner = client.users.cache.get(this.OwnerId);
        for (var i in this.BetaTestersIds)
            this.BetaTesters[i] = client.users.cache.get(this.BetaTestersIds[i]);
    }
}
exports.Config = Config;
Config.BetaTesters = [];
