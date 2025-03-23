import { PermissionString } from "discord.js";
import { CommandExecutionData, CommandAccess, CommandCooldown, CommandGroup, CommandResult } from "./CommandModule";

export { Command }

interface Command {

    readonly Name: string,
    readonly Group: CommandGroup,
    readonly Usage: string[],
    readonly Access: CommandAccess,
    readonly Cooldown: CommandCooldown, 
    readonly MemberPermissions: PermissionString[],
    readonly BotPermissions: PermissionString[]

    readonly Execute: (d: CommandExecutionData) => CommandResult
};