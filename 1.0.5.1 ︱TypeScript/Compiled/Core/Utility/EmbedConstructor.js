"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedConstructor = void 0;
const discord_js_1 = require("discord.js");
const Config_1 = require("./Config");
const Main_1 = require("../../Main");
class EmbedConstructor {
    static ConstructEmbed(text, guild, header, body, color) {
        const embed = new discord_js_1.MessageEmbed({
            title: header,
            description: body,
            color: color,
            timestamp: new Date().getTime(),
            author: {
                name: text["Bot_created_by"].replace("{owner}", Config_1.Config.Owner.tag),
                iconURL: Config_1.Config.Owner.avatarURL(),
                url: Config_1.Config.ServerLink
            },
            footer: guild ?
                {
                    text: `${guild.name}  ┃  ${guild.me.displayName}`,
                    iconURL: guild.iconURL()
                } :
                {
                    text: Main_1.client.user.username,
                    iconURL: Main_1.client.user.avatarURL()
                }
        });
        return embed;
    }
}
exports.EmbedConstructor = EmbedConstructor;
