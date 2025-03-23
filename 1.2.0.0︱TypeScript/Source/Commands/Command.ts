
import { DiscordJS } from '../../discord.js-master/typings/index'
export { Command }

interface Command extends DiscordJS {

    readonly cooldown: CommandCooldown, 
    readonly memberPermissions: PermissionString[],
    readonly botPermissions: PermissionString[]
    readonly execute: (d: CommandExecutionData) => CommandResult
}



var cmd: Command = { }