import { PermissionString } from 'discord.js';
import { CommandContext } from './CommandContext';
import { CommandAccess } from './CommandAccess';
import { CommandCooldown } from './CommandCooldown';
import { CommandGroup } from './CommandGroup';
import { CommandResult } from './CommandResult';

export { Command }

interface Command {

    readonly Name: string,
    readonly CommandGroup: CommandGroup,
    readonly Usage: string[],
    readonly CommandAccess: CommandAccess,
    readonly Cooldown: CommandCooldown, 
    readonly RequiredPermissions: PermissionString[]

    readonly Execute: (context: CommandContext) => CommandResult
}