import { ClientEvents } from "discord.js";

export { ClientEvent }

interface ClientEvent {

    Event: keyof ClientEvents,
    Execute: (...args: any) => void
}