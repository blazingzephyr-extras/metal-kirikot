import { Client } from 'discord.js'
import { readdirSync } from 'fs'

export class EventHandler {

    public static async Initialize (client: Client) {

        const files: string[] = readdirSync(`${__dirname}/../Events`)
        for(let i in files) {

            var cli = await import(`../Events/${files[i]}`)
            client.on(cli.event.Event, cli.event.Function)
        }
    }
}