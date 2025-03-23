"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Config_1 = require("../Core/Utility/Config");
const Main_1 = require("../Main");
const event = {
    Event: 'ready',
    Execute: () => {
        Config_1.Config.FetchVia(Main_1.client);
        Main_1.client.user.setPresence({
            activity: {
                name: 'version 1.0.0! 😸🔧',
                type: 'PLAYING',
                url: Config_1.Config.Server
            }
        });
        console.log(`✅ Launched bot as ${Main_1.client.user.tag}!`);
    }
};
exports.event = event;
