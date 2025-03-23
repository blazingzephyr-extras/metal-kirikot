import { Client } from 'discord.js'
import { readdirSync } from 'fs'
import { MK_Event } from './Events'

export { EventHandler }

class EventHandler {

    public static async InitializeFor(client: Client) {

        const dir: string = `${__dirname}/../../Events`
        const files: string[] = readdirSync(dir)

        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const event: MK_Event = module.event
            client.on(event.EventType, event.Execute)

            console.log(`✅ Loaded ${files[i]} event!`)
        }
    }
}