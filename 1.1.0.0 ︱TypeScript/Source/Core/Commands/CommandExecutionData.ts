import { DMChannel, Guild, GuildMember, Message, MessageAttachment, NewsChannel, TextChannel, User } from "discord.js";
import { Dictionary } from "../Utility/Dictionary";

export { CommandExecutionData }

interface CommandExecutionData {

    readonly Message: Message,
    readonly User: User,
    readonly Member: GuildMember,
    readonly Channel: TextChannel | DMChannel | NewsChannel,
    readonly Guild: Guild,
    readonly Attachments: MessageAttachment[],
    readonly Args: string[],
    readonly Text: Dictionary<any>,
}