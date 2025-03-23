import { MessageEmbed } from 'discord.js'
import { MK_Command, ExecutionData, Result, SilentResult } from '../Core/Commands/CommandsЬщвгду'
import { Config } from '../Core/Utility/Config'
import { EmbedConstructor } from '../Core/Utility/EmbedConstructor'
import { client } from '../Main'

export { command }

const command: MK_Command = {

    Name: 'ping',
    CommandGroup: 'Utility',
    Usage: [ 'ping', 'p', 'пинг', 'п' ],
    Access: { Channels: 'All', Level: 'BetaTesters' },
    Cooldown: { Target: 'User', Duration: 10000 },
    MemberPermissions: [],
    BotPermissions: [],

    Execute: (data: ExecutionData) => {
        
        const embed: MessageEmbed = EmbedConstructor.ConstructEmbed(data.Text, data.Guild, data.Text['Ping']['Title'], null, Config.Colors['violet'])
        embed.addField(data.Text['Ping']['Commands'], `${Date.now() - data.Message.createdTimestamp} ${data.Text['MS']}`)
        embed.addField(data.Text['Ping']['API'], `${client.ws.ping} ${data.Text['MS']}`)

        data.Channel.send(embed)
        return SilentResult()
    }
}