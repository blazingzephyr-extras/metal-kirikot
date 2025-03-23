import { ClientEvents } from 'discord.js';

export { BotEvent }

interface BotEvent {

    Event: keyof ClientEvents,
    Execute: (...args: any) => void
}