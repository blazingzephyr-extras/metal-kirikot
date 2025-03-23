import { Client } from 'discord.js'
import { readdirSync } from 'fs'
import { BotEvent } from './Events.Index'

export { EventHandler }

class EventHandler {

    public static async InitializeFor(client: Client) {

        const dir: string = `${__dirname}/../../Events`
        const files: string[] = readdirSync(dir)

        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const event: BotEvent = module.event
            client.on(event.Event, event.Execute)
        }
    }
}