"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentResult = exports.Result = exports.CommandResult = void 0;
const discord_js_1 = require("discord.js");
const Config_1 = require("../General Utils/Config");
function Result(type, header, body) {
    let color = null;
    switch (type) {
        case 'success': color = Config_1.Config.Colors['green_success'];
        case 'warn': color = Config_1.Config.Colors['yellow_warn'];
        case 'error': color = Config_1.Config.Colors['red_error'];
    }
    return new CommandResult({ SendMessage: true, MessageEmbed: { Color: color, Header: header, Body: body } });
}
exports.Result = Result;
function SilentResult() {
    return new CommandResult({ SendMessage: false });
}
exports.SilentResult = SilentResult;
class CommandResult {
    constructor(_properties) {
        this._properties = _properties;
    }
    ConstructEmbed(message) {
        const sendMessage = this._properties.SendMessage;
        let embed = null;
        if (sendMessage) {
            const properties = this._properties;
            const embedProperties = properties.MessageEmbed;
            const guild = message.guild;
            const client = message.client.user;
            console.log(embedProperties.Color);
            embed = new discord_js_1.MessageEmbed({
                title: embedProperties.Header,
                description: embedProperties.Body,
                color: embedProperties.Color,
                timestamp: new Date().getTime(),
                author: { name: `Bot by ${Config_1.Config.Owner.username}!`, iconURL: Config_1.Config.Owner.avatarURL(), url: Config_1.Config.ServerLink },
                footer: guild ? { text: `${guild.name}┃${guild.me.displayName}`, iconURL: guild.iconURL() } : { text: client.username, iconURL: client.avatarURL() }
            });
        }
        return { SendMessage: sendMessage, MessageEmbed: embed };
    }
}
exports.CommandResult = CommandResult;
