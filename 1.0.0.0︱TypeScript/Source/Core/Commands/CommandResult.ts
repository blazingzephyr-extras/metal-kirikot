import { ClientUser, Guild, Message, MessageEmbed } from 'discord.js';
import { Config } from '../Utility/Config';

export { CommandResult, Result, SilentResult }

function Result(type: 'success' | 'warn' | 'error', header: string, body: string) : CommandResult {

    let color: string
    let isSuccessful: boolean

    switch(type) {

        case 'success': { color = Config.Colors['green_success']; isSuccessful = true }; break;
        case 'warn': { color = Config.Colors['yellow_warn']; isSuccessful = true }; break;
        case 'error': { color = Config.Colors['red_error']; isSuccessful = false }; break;
    }

    return new CommandResult({ SendMessage: true, IsSuccessful: isSuccessful, MessageEmbed: { Color: color, Header: header, Body: body }})
}

function SilentResult() : CommandResult {

    return new CommandResult({ SendMessage: false, IsSuccessful: true })
}

interface ResultEmbed {

    readonly Color: string
    readonly Header: string
    readonly Body: string
}

interface ResultProperties {

    readonly SendMessage: boolean
    readonly IsSuccessful: boolean
    readonly MessageEmbed?: ResultEmbed
}

class CommandResult {

    public readonly IsSuccessful: boolean
    private readonly _properties: ResultProperties

    constructor(_properties: ResultProperties) {

        this._properties = _properties
        this.IsSuccessful = _properties.IsSuccessful
    }

    public ConstructEmbed(text: { [key: string]: any }, message: Message) : { SendMessage: boolean, IsSuccessful: boolean, MessageEmbed?: MessageEmbed } {

        const properties: ResultProperties = this._properties
        const sendMessage: boolean = properties.SendMessage
        let embed: MessageEmbed = null

        if(sendMessage) {

            const embedProperties: ResultEmbed = properties.MessageEmbed
            const guild: Guild = message.guild
            const client: ClientUser = message.client.user

            embed = new MessageEmbed({

                title: embedProperties.Header,
                description: embedProperties.Body,
                color: embedProperties.Color,
                timestamp: new Date().getTime(),
                author: { name: text['bot_created_by'].replace('{owner}', Config.Owner.tag), iconURL: Config.Owner.avatarURL(), url: Config.Server },
                footer: guild ? { text: `${guild.name}  •  ${guild.me.displayName}`, iconURL: guild.iconURL() } : { text: client.username, iconURL: client.avatarURL() }
            })
        }

        return { SendMessage: sendMessage, IsSuccessful: true, MessageEmbed: embed };
    }
}