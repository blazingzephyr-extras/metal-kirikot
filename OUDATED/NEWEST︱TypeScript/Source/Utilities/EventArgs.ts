import { Client, Message, User, GuildMember, Guild, Channel, DMChannel, TextChannel, VoiceChannel, NewsChannel, StoreChannel, MessageAttachment } from 'discord.js'
import { MetalKirikot } from '../main'

/**
 * Useful utility created for sending parameters 
 */
export class EventArgs {
    public readonly Client: Client = MetalKirikot;
    public Message: Message;
    public User: User;
    public Member: GuildMember | null;
    public Guild: Guild | null;
    public Channel: Channel | DMChannel | TextChannel | VoiceChannel | NewsChannel | StoreChannel;
    public Arguments: string[] | null;
    public Attachments: MessageAttachment[] | null;
    constructor(message: Message) {
        this.Message = message;
        this.User = message.author;
        this.Member = message.member;
        this.Channel = message.channel;
        this.Guild = message.guild;
        this.Arguments = message.content.split(" ").slice(1);
        this.Attachments = message.attachments.array();
    }
}