import { Client, DMChannel, Guild, GuildMember, Message, MessageAttachment, NewsChannel, TextChannel, User } from "discord.js";

export interface CommandContext {

    readonly Client: Client,
    readonly Message: Message,
    readonly User: User,
    readonly Channel: TextChannel | DMChannel | NewsChannel,
    readonly Guild: Guild,
    readonly Member: GuildMember,
    readonly Attachments: MessageAttachment[],
    readonly Args: string[]
}