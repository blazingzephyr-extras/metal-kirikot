import { Client, Message, Guild, MessageAttachment, Collection, Channel, TextChannel, DMChannel, NewsChannel } from "discord.js";
import { MetalKirikot } from '../main'

export class EventArgs {
    public Client: Client = MetalKirikot;
    public Message: Message;
    public Channel: TextChannel | DMChannel | NewsChannel;
    public Guild: Guild | null = null;
    public Arguments: string[] | null = null;
    public Attachments: Collection<string, MessageAttachment> | null = null;

    constructor(message: Message) {
        this.Message = message;
        this.Channel = message.channel;
        if(message.guild)
            this.Guild = message.guild;
        if (message.content)
            this.Arguments = message.content.split(" ").slice(1);
        if (message.attachments)
            this.Attachments = message.attachments;
    }
}