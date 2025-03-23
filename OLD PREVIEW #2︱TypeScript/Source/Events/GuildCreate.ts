import { Guild } from "discord.js"
import { ClientEvent } from "../Core/Events/ClientEvent"
import { Config } from "../Core/General Utils/Config"
import { Database } from "../Core/General Utils/Database"

export { event }

const event: ClientEvent = {

    Event: 'guildCreate',
    Execute: (guild: Guild) => {

        Database.AddGuild({ GuildId: guild.id, SupportedPrefixes: Config.DefaultPrefixes })
    }
}