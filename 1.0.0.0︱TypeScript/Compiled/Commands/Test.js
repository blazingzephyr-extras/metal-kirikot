"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Commands_Index_1 = require("../Core/Commands/Commands.Index");
const command = {
    Name: 'test',
    CommandGroup: 'Utility',
    Usage: ['test'],
    CommandAccess: { ChannelAccess: 'GuildOnly', AccessLevel: 'Everyone' },
    Cooldown: { CooldownBucket: 'User', Cooldown: 10000 },
    MemberPermissions: [],
    BotPermissions: ['VIEW_AUDIT_LOG'],
    Execute: (context) => {
        context.Channel.send("This command works!");
        return Commands_Index_1.Result('success', "Embed Header!", "Embed Body!");
    }
};
exports.command = command;
/*

                    

                else if(message.guild && !message.guild?.me.permissions.has(runnableCommand.BotPermissions, true))
                    return this.ErrorEmbed(this._text['not_enough_perms_bot'].replace('{required_perms}', runnableCommand.BotPermissions.join(', ')))
                    */ 
