
import { Client } from 'discord.js'
import { readdirSync } from 'fs'
import { MK_Event } from './Events'
export { LoadEventsFor }

async function LoadEventsFor(client: Client) {

    const dir: string = `${__dirname}\\..\\..\\Events`;
    const files: string[] = readdirSync(dir);

    for(let i in files) {

        const file = files[i];
        const module = await import(`${dir}/${file}`);
        const event: MK_Event = module.event;

        client.on(event.EventType, event.Execute);
        console.log(`✅ Loaded ${file} event!`);
    }
}