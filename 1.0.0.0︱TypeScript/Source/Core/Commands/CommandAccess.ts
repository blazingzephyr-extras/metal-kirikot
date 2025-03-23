
export { CommandAccess }

type ChannelAccessType = 'DMsOnly' | 'GuildOnly' | 'Everywhere'
type AccessLevel = 'BotOwner' | 'BetaTesters' | 'GuildOwnerOnly'  | 'Everyone' 

interface CommandAccess {

    readonly ChannelAccess: ChannelAccessType
    readonly AccessLevel: AccessLevel
}