"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Config_1 = require("../Core/General Utils/Config");
const Database_1 = require("../Core/General Utils/Database");
const event = {
    Event: 'guildCreate',
    Execute: (guild) => {
        Database_1.Database.AddGuild({ GuildId: guild.id, SupportedPrefixes: Config_1.Config.DefaultPrefixes });
    }
};
exports.event = event;
