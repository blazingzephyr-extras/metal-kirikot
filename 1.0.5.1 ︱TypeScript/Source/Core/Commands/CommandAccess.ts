
export { CommandAccess }

type AccessibleChannels = "DMs" | "Guilds" | "All"
type AccessLevel = "BotOwner" | "BetaTesters" | "GuildOwner"  | "Everyone" 

interface CommandAccess {

    readonly Channels: AccessibleChannels
    readonly Level: AccessLevel
}