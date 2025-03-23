"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const fs_1 = require("fs");
class CommandHandler {
    static Load() {
        const path = `${__dirname}/../Commands/`;
        const files = fs_1.readdirSync(path);
        for (var i in files)
            Promise.resolve().then(() => require(`${path}/${files[i]}`)).then(module => this._commands[i] = module.command);
    }
    static Run(message) {
        const content = message.content.split(' ');
        if (content[0].startsWith('m!')) {
            const commandUsage = content[0].replace('m!', '');
            const command = this._commands.find(predicate => predicate.Usage.includes(commandUsage));
            if (command) {
                const commandContext = {
                    Client: null,
                    Message: message,
                    User: message.author,
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(),
                    Args: content.slice(1)
                };
                const result = command.Execute(commandContext);
                const send = result.SendMessage();
                if (send)
                    message.channel.send(result.Value);
            }
        }
    }
}
exports.CommandHandler = CommandHandler;
CommandHandler._commands = [];
