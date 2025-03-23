import { Message } from 'discord.js'
import { BotEvent } from '../Core/Events/Events.Index'
import { CommandHandler } from '../Core/Commands/Commands.Index'

export { event }

const event: BotEvent = {

    Event: 'message',
    Execute: (message: Message) => {
        
        CommandHandler.Run(message)
    }
}