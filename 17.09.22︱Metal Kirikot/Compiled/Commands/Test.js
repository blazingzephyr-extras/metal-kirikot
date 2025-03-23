"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Index_1 = require("../Core/Commands/Index");
const command = {
    Name: 'test',
    CommandGroup: 'Fun',
    Usage: ['test'],
    CommandAccess: { ChannelAccess: 'Everywhere', AccessLevel: 'Everyone' },
    Cooldown: { CooldownBucket: 'User', Cooldown: 10000 },
    RequiredPermissions: [],
    Execute: (context) => {
        if (context.Args[0] == 'h')
            context.Channel.send("E!");
        else
            context.Channel.send("he?");
        return (0, Index_1.Result)('error', 'header', 'body');
    }
};
exports.command = command;
