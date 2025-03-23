
import { User } from 'discord.js';
import { MK_Event } from '../Core/Events/Events'
import { client, Config } from '../Main'
export { event, owner }

let owner: User;
const event: MK_Event = {

    EventType: 'ready',
    Execute: async () => {

        const ownerId = Config.Owner;
        owner = await client.users.fetch(ownerId);
    }
}