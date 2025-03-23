import { Message } from "discord.js"
import { CommandHandler } from "../Core/Commands/Index"
import { ClientEvent } from "../Core/Events/ClientEvent"

export { event }

const event: ClientEvent = {

    Event: 'message',
    Execute: (message: Message) => CommandHandler.Run(message)
}