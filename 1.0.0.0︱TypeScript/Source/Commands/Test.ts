import { Command, CommandContext, Result, SilentResult } from '../Core/Commands/Commands.Index'

export { command }

const command: Command = {

    Name: 'test',
    CommandGroup: 'Utility',
    Usage: [ 'test' ],
    CommandAccess: { ChannelAccess: 'GuildOnly', AccessLevel: 'Everyone' },
    Cooldown: { CooldownBucket: 'User', Cooldown: 10000 },
    MemberPermissions: [  ],
    BotPermissions: [ 'VIEW_AUDIT_LOG' ],

    Execute: (context: CommandContext) => {

        context.Channel.send("This command works!")
        return Result('success', "Embed Header!", "Embed Body!")
    }
}

/*

                    

                else if(message.guild && !message.guild?.me.permissions.has(runnableCommand.BotPermissions, true))
                    return this.ErrorEmbed(this._text['not_enough_perms_bot'].replace('{required_perms}', runnableCommand.BotPermissions.join(', ')))
                    */