
export { Access }

interface Access {

    readonly Channels: 'DMs' | 'Guilds' | 'All'
    readonly Level: 'BotOwner' | 'BetaTesters' | 'GuildOwner' | 'Everyone' 
}