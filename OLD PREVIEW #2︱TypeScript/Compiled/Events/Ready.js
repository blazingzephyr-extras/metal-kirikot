"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Config_1 = require("../Core/General Utils/Config");
const Database_1 = require("../Core/General Utils/Database");
const Main_1 = require("../Main");
const event = {
    Event: 'ready',
    Execute: () => {
        console.log("ready?");
        Main_1.client.generateInvite().then(link => console.log(link));
        Database_1.Database.FetchGuilds(Main_1.client);
        Config_1.Config.FinishInitializing(Main_1.client);
    }
};
exports.event = event;
