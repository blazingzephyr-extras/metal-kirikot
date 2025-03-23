import { DMChannel, Guild, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js'
import { readdirSync } from 'fs'
import { Collection } from 'mongodb'
import { client } from '../../Main'
import { Database } from '../Database/Database'
import { Config, BotStrings } from '../Utility/Config'
import { Command, CommandContext, CommandResult } from './Commands.Index'

export { CommandHandler }

class CommandHandler {

    private static _commands: Command[] = []
    private static _text: { [key: string]: any }
    private static _channel: TextChannel | DMChannel | NewsChannel
    private static _guild: Guild

    public static async Load() {
        
        const dir: string = `${__dirname}/../../Commands`
        const files: string[] = readdirSync(dir)

        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const command: Command = module.command 
            this._commands[i] = command
        }
    }

    public static async Run(message: Message) {

        const properties = await Database.ChannelSettings.findOne({ "ChannelId": message.channel.id })
        const prefix: string = properties.Prefixes.find(predicate => message.content.startsWith(predicate))
        const isMessageCommand: boolean = prefix ? true : false

        if(isMessageCommand) {

            const content = message.content.split(' ')
            const command = content[0].substring(prefix.length).toLowerCase()
            const runnableCommand: Command = this._commands.find(predicate => predicate.Usage.includes(command))

            this._guild = message.guild 
            this._text = BotStrings[properties.Language]
            this._channel = message.channel

            if(runnableCommand) {

                if(runnableCommand.CommandAccess.AccessLevel == 'BotOwner' && message.author != Config.Owner)
                    return this.ErrorEmbed(this._text['only_for_owner'].replace('{owner}', Config.Owner.tag))

                else if(runnableCommand.CommandAccess.AccessLevel == 'BetaTesters' && !Config.BetaTesters.includes(message.author))
                    return this.ErrorEmbed(this._text['only_for_betatesters'])

                else if(runnableCommand.CommandAccess.ChannelAccess == 'DMsOnly' && this._guild)
                    return this.ErrorEmbed(this._text['dms_only'])

                else if(runnableCommand.CommandAccess.ChannelAccess == 'GuildOnly' && !this._guild)
                    return this.ErrorEmbed(this._text['guild_only'])

                else if(runnableCommand.CommandAccess.AccessLevel == 'GuildOwnerOnly' && message.guild.owner != message.member)
                    return this.ErrorEmbed(this._text['guild_owner_only'].replace('{owner}', message.guild.owner.user.tag))
                    
                else if(runnableCommand.MemberPermissions.includes('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR'))
                    return this.ErrorEmbed(this._text['administrator_only'])

                else if(message.guild && !message.member?.permissions.has(runnableCommand.MemberPermissions, true))
                    return this.ErrorEmbed(this._text['not_enough_permissions']['user'].replace('{required_permissions}', `**${runnableCommand.MemberPermissions.join(', ')}**`))

                else if(message.guild && !message.guild?.me.permissions.has(runnableCommand.BotPermissions, true))
                    return this.ErrorEmbed(this._text['not_enough_permissions']['bot'].replace('{required_permissions}', `**${runnableCommand.BotPermissions.join(', ')}**`))

                const currentTime = new Date().getTime()
                const cooldowns = [ 
                    { Name: 'global', Collection: Database.Global }, 
                    { Name: 'users', Collection: Database.Users, TargetId: message.author.id },
                    { Name: 'channels', Collection: Database.Channels, TargetId: message.channel.id }, 
                    { Name: 'guilds', Collection: Database.Guilds, TargetId: message.guild?.id },
                ]

                for(var i in cooldowns) {

                    const schema = cooldowns[i].TargetId == undefined ? { "Name": runnableCommand.Name } : { "Name": runnableCommand.Name, "TargetId": cooldowns[i].TargetId }
                    var cooldown = await cooldowns[i].Collection.findOne(schema)

                    if(cooldown) {

                        if(currentTime >= cooldown.ExpireDate)
                            cooldowns[i].Collection.deleteOne(cooldown)
                        else
                            return this.ErrorEmbed(this._text['command_is_on_cooldown'][cooldowns[i].Name].replace('{time_left}', `${(cooldown.ExpireDate - currentTime) / 1000}`))
                    }
                }

                const context: CommandContext = { 
                    Client: message.client, 
                    Message: message, 
                    User: message.author, 
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(), 
                    Args: content.slice(1)
                }
                
                const result: CommandResult = runnableCommand.Execute(context)
                const resultEmbed = result.ConstructEmbed(this._text, message)
                if(resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed)

                if(result.IsSuccessful) {
                    
                    const schema = <any>{ 'Name': runnableCommand.Name, 'ExpireDate': currentTime + runnableCommand.Cooldown.Cooldown }
                    let collection: Collection;

                    switch(runnableCommand.Cooldown.CooldownBucket) {

                        case 'Global': collection = Database.Global; break;
                        case 'Guild': collection = Database.Guilds; schema.TargetId = message.guild.id; break;
                        case 'Channel': collection = Database.Channels; schema.TargetId = message.channel.id; break;
                        case 'User': collection = Database.Users; schema.TargetId = message.author.id; break;
                    }

                    await collection.insertOne(schema)
                }
            }
            else
                return this.ErrorEmbed(this._text['command_wasnt_found'].replace('{prefix}', prefix))
        }
    }

    private static ErrorEmbed(body: string) {

        const embed: MessageEmbed = new MessageEmbed({

            title: this._text['command_exec_error'],
            description: body,
            color: Config.Colors['red_error'],
            timestamp: new Date().getTime(),
            author: { 
                name: this._text['bot_created_by'].replace('{owner}', Config.Owner.tag), 
                iconURL: Config.Owner.avatarURL(), 
                url: Config.Server 
            },
            footer: this._guild ? { text: `${this._guild.name} • ${this._guild.me.displayName}`, iconURL: this._guild.iconURL() } : 
                                  { text: client.user.username, iconURL: client.user.avatarURL() }
        })
    
        this._channel.send(embed)
    }
}