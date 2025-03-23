
import { PermissionString } from 'discord.js';
import { ExecutionData, Access, Cooldown, Group, Result } from '../Commands';
export { MK_Command }

interface MK_Command {

    readonly Name: string,
    readonly CommandGroup: Group,
    readonly Usage: string[],
    readonly Access: Access,
    readonly Cooldown: Cooldown, 
    readonly MemberPermissions?: PermissionString[],
    readonly BotPermissions?: PermissionString[]
    readonly Execute: (data: ExecutionData) => Result
}