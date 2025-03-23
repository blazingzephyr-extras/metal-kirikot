
export { AccessProperties }

type AccessibleChannels = 'DMs' | 'Guilds' | 'All'
type AccessLevel = 'BotOwner' | 'BetaTesters' | 'GuildOwner'  | 'Everyone' 

interface AccessProperties {

    readonly Channels: AccessibleChannels
    readonly Level: AccessLevel
}