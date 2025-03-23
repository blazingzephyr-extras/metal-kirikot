"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Commands_1 = require("./Core/Commands/Commands");
let command = {
    Name: 'test',
    CommandGroup: 'Utility',
    Usage: ['test'],
    Access: { Channels: 'Guilds', Level: 'Everyone' },
    Cooldown: { CooldownTarget: 'User', CooldownDuration: 10000 },
    MemberPermissions: [],
    BotPermissions: ['VIEW_AUDIT_LOG'],
    Execute: (context) => {
        context.Channel.send("This command works!");
        return Commands_1.Result('success', "Embed Header!", "Embed Body!");
    }
};
exports.command = command;
