import { PermissionString } from 'discord.js';
import { CommandContext, CommandAccess, CommandCooldown, CommandGroup, CommandResult } from './Commands.Index';

export { Command }

interface Command {

    readonly Name: string,
    readonly CommandGroup: CommandGroup,
    readonly Usage: string[],
    readonly CommandAccess: CommandAccess,
    readonly Cooldown: CommandCooldown, 
    readonly MemberPermissions?: PermissionString[],
    readonly BotPermissions?: PermissionString[]

    readonly Execute: (context: CommandContext) => CommandResult
}