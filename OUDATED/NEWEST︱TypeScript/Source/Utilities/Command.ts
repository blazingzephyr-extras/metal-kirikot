import { PermissionString } from 'discord.js'
import { EventArgs } from './EventArgs'

export class Command {
    public Options: CommandOptions;
    constructor(options: CommandOptions) {
        this.Options = options;
    }
}
export interface CommandOptions { 
    Name: string; 
    Usage: string[];
    CommandGroup: CommandGroup,
    CommandType: CommandType; 
    RequiredPermissions: PermissionString[]; 
    Execute: (eventArgs: EventArgs) => void;
}
export enum CommandGroup {
    Any
    /*Moderation,
    LevelUp,
    Color,
    Fun,
    Music*/
}
export enum CommandType {
    BotOwnerOnly,
    BetaTesterOnly,
    GuildOwnerOnly,
    GuildOnly,
    Everywhere
}