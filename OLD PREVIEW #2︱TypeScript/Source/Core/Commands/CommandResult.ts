    
import { ClientUser, Guild, Message, MessageEmbed } from 'discord.js';
import { Config } from '../General Utils/Config';

export { CommandResult, Result, SilentResult }

function Result(type: 'success' | 'warn' | 'error', header: string, body: string) : CommandResult {

    let color: string = null
    switch(type) {

        case 'success': color = Config.Colors['green_success']
        case 'warn': color = Config.Colors['yellow_warn']
        case 'error': color = Config.Colors['red_error']
    }

    return new CommandResult({ SendMessage: true, MessageEmbed: { Color: color, Header: header, Body: body }})
}

function SilentResult() : CommandResult {

    return new CommandResult({ SendMessage: false })
}

interface ResultEmbed {

    readonly Color: string
    readonly Header: string
    readonly Body: string
}

interface ResultProperties {

    readonly SendMessage: boolean
    readonly MessageEmbed?: ResultEmbed
}

class CommandResult {

    private readonly _properties: ResultProperties

    constructor(_properties: ResultProperties) {

        this._properties = _properties
    }

    public ConstructEmbed(message: Message) : { SendMessage: boolean, MessageEmbed?: MessageEmbed } {

        const sendMessage: boolean = this._properties.SendMessage
        let embed: MessageEmbed = null

        if(sendMessage) {

            const properties: ResultProperties = this._properties
            const embedProperties: ResultEmbed = properties.MessageEmbed
            const guild: Guild = message.guild
            const client: ClientUser = message.client.user

            console.log(embedProperties.Color)
            embed = new MessageEmbed({

                title: embedProperties.Header,
                description: embedProperties.Body,
                color: embedProperties.Color,
                timestamp: new Date().getTime(),
                author: { name: `Bot by ${Config.Owner.username}!`, iconURL: Config.Owner.avatarURL(), url: Config.ServerLink },
                footer: guild ? { text: `${guild.name}┃${guild.me.displayName}`, iconURL: guild.iconURL() } : { text: client.username, iconURL: client.avatarURL() }
            })
        }

        return { SendMessage: sendMessage, MessageEmbed: embed };
    }
}