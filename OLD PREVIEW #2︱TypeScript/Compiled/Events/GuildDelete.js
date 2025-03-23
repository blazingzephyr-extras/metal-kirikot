"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Database_1 = require("../Core/General Utils/Database");
const event = {
    Event: 'guildDelete',
    Execute: (guild) => {
        Database_1.Database.RemoveGuild(guild.id);
    }
};
exports.event = event;
