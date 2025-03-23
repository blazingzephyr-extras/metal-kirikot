import { PermissionString } from 'discord.js';
import { ExecutionData, AccessProperties, CommandCooldown, CommandGroup, CommandResult } from './Commands';

export { MK_Command }

interface MK_Command {

    readonly Name: string,
    readonly CommandGroup: CommandGroup,
    readonly Usage: string[],
    readonly Access: AccessProperties,
    readonly Cooldown: CommandCooldown, 
    readonly MemberPermissions?: PermissionString[],
    readonly BotPermissions?: PermissionString[]

    readonly Execute: (data: ExecutionData) => CommandResult
}