import { ClientEvents } from "discord.js";

export interface ClientEvent {

    Event: keyof ClientEvents,
    Function: (args: any) => void
}