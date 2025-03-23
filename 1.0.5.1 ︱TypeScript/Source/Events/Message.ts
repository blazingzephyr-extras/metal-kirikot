import { Message } from "discord.js"
import { MK_Event } from "../Core/Events/Events"
import { CommandHandler } from "../Core/Commands/CommandsЬщвгду"

export { event }

const event: MK_Event = {

    EventType: "message",
    Execute: (message: Message) => {

        if(message.content == "m!ping")
        message.channel.send(Date.now() - message.createdTimestamp)
    }
}