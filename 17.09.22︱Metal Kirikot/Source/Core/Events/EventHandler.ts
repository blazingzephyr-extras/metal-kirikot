import { Client } from 'discord.js'
import { readdirSync } from 'fs'
import { ClientEvent } from './ClientEvent'

export { EventHandler }

class EventHandler {

    public static async Initialize(client: Client) {

        const dir = `${__dirname}/../../Events`
        const files: string[] = readdirSync(dir)
        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const event: ClientEvent = module.event 
            client.on(event.Event, event.Execute)
        }
    }
}