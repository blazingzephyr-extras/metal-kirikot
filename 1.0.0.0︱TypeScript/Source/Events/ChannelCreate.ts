import { Channel } from 'discord.js'
import { Database } from '../Core/Database/Database.Index'
import { BotEvent } from '../Core/Events/Events.Index'

export { event }

const event: BotEvent = {

    Event: 'channelCreate',
    Execute: (channel: Channel) => {

        const channelType = channel.type
        if(channelType == 'dm' || channelType == 'text' || channelType == 'news')
            Database.AddChannel(channel.id)
    }
}