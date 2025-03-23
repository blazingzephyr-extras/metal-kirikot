"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentResult = exports.Result = exports.CommandResult = void 0;
const discord_js_1 = require("discord.js");
const Config_1 = require("../Utility/Config");
function Result(type, header, body) {
    let color;
    let isSuccessful;
    switch (type) {
        case 'success':
            {
                color = Config_1.Config.Colors['green_success'];
                isSuccessful = true;
            }
            ;
            break;
        case 'warn':
            {
                color = Config_1.Config.Colors['yellow_warn'];
                isSuccessful = true;
            }
            ;
            break;
        case 'error':
            {
                color = Config_1.Config.Colors['red_error'];
                isSuccessful = false;
            }
            ;
            break;
    }
    return new CommandResult({ SendMessage: true, IsSuccessful: isSuccessful, MessageEmbed: { Color: color, Header: header, Body: body } });
}
exports.Result = Result;
function SilentResult() {
    return new CommandResult({ SendMessage: false, IsSuccessful: true });
}
exports.SilentResult = SilentResult;
class CommandResult {
    constructor(_properties) {
        this._properties = _properties;
        this.IsSuccessful = _properties.IsSuccessful;
    }
    ConstructEmbed(text, message) {
        const properties = this._properties;
        const sendMessage = properties.SendMessage;
        let embed = null;
        if (sendMessage) {
            const embedProperties = properties.MessageEmbed;
            const guild = message.guild;
            const client = message.client.user;
            embed = new discord_js_1.MessageEmbed({
                title: embedProperties.Header,
                description: embedProperties.Body,
                color: embedProperties.Color,
                timestamp: new Date().getTime(),
                author: { name: text['bot_created_by'].replace('{owner}', Config_1.Config.Owner.tag), iconURL: Config_1.Config.Owner.avatarURL(), url: Config_1.Config.Server },
                footer: guild ? { text: `${guild.name}  •  ${guild.me.displayName}`, iconURL: guild.iconURL() } : { text: client.username, iconURL: client.avatarURL() }
            });
        }
        return { SendMessage: sendMessage, IsSuccessful: true, MessageEmbed: embed };
    }
}
exports.CommandResult = CommandResult;
