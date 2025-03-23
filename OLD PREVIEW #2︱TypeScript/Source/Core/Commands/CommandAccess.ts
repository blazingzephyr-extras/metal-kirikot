
export { CommandAccess, ChannelAccessType, AccessLevel }

type ChannelAccessType = 'DMsOnly' | 'GuildOnly' | 'Everywhere'
type AccessLevel = 'BotOwner' | 'BetaTesters' | 'GuildOwnerOnly' | "AdminOnly" | 'Everyone' 

interface CommandAccess {

    readonly ChannelAccess: ChannelAccessType
    readonly AccessLevel: AccessLevel
}