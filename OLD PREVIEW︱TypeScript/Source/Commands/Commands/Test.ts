import { CommandContext } from '../Core/ComamndContext'
import { Command } from '../Core/Command'
import { CommandAccess } from '../Core/CommandAccess'
import { CommandGroup } from '../Core/CommandGroup'
import { CommandResult } from '../Core/CommandResult'
import { CooldownBucketType } from '../Core/CommandCooldown'

export declare let command: Command
command = {

    Name: 'Test',
    CommandGroup: CommandGroup.Other,
    Usage: [ 'test' ],
    CommandAccess: CommandAccess.Other,
    Cooldown: { BucketType: CooldownBucketType.User, CooldownDuration: 10  },
    RequiredPermissions: [],

    Execute: (context: CommandContext) => {

        context.Channel.send("Test")
        return CommandResult.Success('E', 'E')
    }
}