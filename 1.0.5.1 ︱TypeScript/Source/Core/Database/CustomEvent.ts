import { ClientEvents } from "discord.js";

export { CustomEvent }

interface CustomEvent {

    EventType: keyof ClientEvents,
    Event: string
};