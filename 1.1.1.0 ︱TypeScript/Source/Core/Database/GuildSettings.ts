
import { MK_Command } from '../Commands/Commands';
export { GuildSettings }

interface GuildSettings {
    
    readonly Id: string,
    readonly Settings: {

        readonly Language: string,
        readonly Prefixes: string[]
    },
    readonly ChannelOverwrites: [
        {
            Id: string,
            Language: string,
            Prefixes: string[]
        }
    ],
    readonly CustomCommands: MK_Command[],
    
    readonly _CommandData: string[]
}