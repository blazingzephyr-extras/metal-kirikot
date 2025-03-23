"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentResult = exports.Result = exports.CommandResult = void 0;
const Config_1 = require("../Utility/Config");
const EmbedConstructor_1 = require("../Utility/EmbedConstructor");
function Result(type, header, body) {
    return new CommandResult({
        SendMessage: true,
        IsSuccessful: type == "error" ? false : true,
        MessageEmbed: {
            Color: Config_1.Config.Colors[type],
            Header: header,
            Body: body
        }
    });
}
exports.Result = Result;
function SilentResult() {
    return new CommandResult({
        SendMessage: false,
        IsSuccessful: true
    });
}
exports.SilentResult = SilentResult;
class CommandResult {
    constructor(_properties) {
        this._properties = _properties;
        this.IsSuccessful = _properties.IsSuccessful;
    }
    Evaluate(message, text) {
        const properties = this._properties;
        const embedProperties = properties.MessageEmbed;
        const embed = properties.SendMessage ? EmbedConstructor_1.EmbedConstructor.ConstructEmbed(text, message.guild, embedProperties.Header, embedProperties.Body, embedProperties.Color) : null;
        return {
            SendMessage: properties.SendMessage,
            IsSuccessful: true,
            MessageEmbed: embed
        };
    }
}
exports.CommandResult = CommandResult;
