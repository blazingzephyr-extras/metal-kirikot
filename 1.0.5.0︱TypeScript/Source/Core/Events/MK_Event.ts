import { ClientEvents } from 'discord.js';

export { MK_Event }

interface MK_Event {

    EventType: keyof ClientEvents,
    Execute: (...args: any) => void
}