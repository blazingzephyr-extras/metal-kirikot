"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResult = void 0;
const discord_js_1 = require("discord.js");
class CommandResult {
    SendMessage() {
        return this._sendMessage;
    }
    static Error(errorName, errorMessage) {
        return this.ConstructEmbed(errorName, errorMessage, "#FF2300");
    }
    static Warning(errorName, errorMessage) {
        return this.ConstructEmbed(errorName, errorMessage, "#FFC300");
    }
    static Success(succeededOperation, successMessage) {
        return this.ConstructEmbed(succeededOperation, successMessage, "#28FF00");
    }
    static SuccessSilent() {
        return new CommandResult();
    }
    static ConstructEmbed(header, body, color) {
        const result = new CommandResult();
        result._sendMessage = true;
        result.Value = new discord_js_1.MessageEmbed({
            title: header,
            description: body,
            timestamp: Date.now() / 1000,
            color: color,
            author: { name: '', url: '' },
            footer: { text: '', iconURL: '' }
        });
        return result;
    }
}
exports.CommandResult = CommandResult;
