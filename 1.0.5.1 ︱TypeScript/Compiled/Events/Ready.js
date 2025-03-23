"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const DatabaseHandler_1 = require("../Core/Database/DatabaseHandler");
const Config_1 = require("../Core/Utility/Config");
const Main_1 = require("../Main");
const event = {
    EventType: "ready",
    Execute: async () => {
        Config_1.Config.FetchVia(Main_1.client);
        await DatabaseHandler_1.Database.FetchVia(Main_1.client);
        Main_1.client.user.setPresence({
            activity: {
                type: "PLAYING",
                name: "beta build of 1.1.0! 😸🔧",
                url: Config_1.Config.ServerLink
            }
        });
        console.log(`✅ Launched bot as ${Main_1.client.user.tag}!`);
    }
};
exports.event = event;
