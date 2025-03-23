"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Commands_1 = require("../Core/Commands/Commands");
const Config_1 = require("../Core/Utility/Config");
const EmbedConstructor_1 = require("../Core/Utility/EmbedConstructor");
const Main_1 = require("../Main");
const command = {
    Name: 'ping',
    CommandGroup: 'Utility',
    Usage: ['ping', 'p', 'пинг', 'п'],
    Access: { Channels: 'All', Level: 'BetaTesters' },
    Cooldown: { Target: 'User', Duration: 10000 },
    MemberPermissions: [],
    BotPermissions: [],
    Execute: (data) => {
        const embed = EmbedConstructor_1.EmbedConstructor.ConstructEmbed(data.Text, data.Guild, data.Text['Ping']['Title'], null, Config_1.Config.Colors['violet']);
        embed.addField(data.Text['Ping']['Commands'], `${Date.now() - data.Message.createdTimestamp} ${data.Text['MS']}`);
        embed.addField(data.Text['Ping']['API'], `${Main_1.client.ws.ping} ${data.Text['MS']}`);
        data.Channel.send(embed);
        return Commands_1.SilentResult();
    }
};
exports.command = command;
