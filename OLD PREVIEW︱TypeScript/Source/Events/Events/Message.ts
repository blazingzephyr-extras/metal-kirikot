import { Guild, Message } from 'discord.js'
import { CommandHandler } from '../../Commands/Core/CommandHandler';
import { ClientEvent } from '../Core/ClientEvent'

export declare let event: ClientEvent
event = {
     
    Event: 'message',
    Function: (message: Message) => CommandHandler.Run(message)
}