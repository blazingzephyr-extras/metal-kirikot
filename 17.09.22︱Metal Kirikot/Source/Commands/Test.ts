import { Command, CommandContext, Result, SilentResult } from '../Core/Commands/Index'

export { command }

const command: Command = {

    Name: 'test',
    CommandGroup: 'Fun',
    Usage: [ 'test' ],
    CommandAccess: { ChannelAccess: 'Everywhere', AccessLevel: 'Everyone' },
    Cooldown: { CooldownBucket: 'User', Cooldown: 10000 },
    RequiredPermissions: [],

    Execute: (context: CommandContext) => {

        if(context.Args[0] == 'h') 
            context.Channel.send("E!")
        else 
            context.Channel.send("he?")

        return Result('error', 'header', 'body')
    }
}