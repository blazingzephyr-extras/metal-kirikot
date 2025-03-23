import { DMChannel, Guild, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js'
import { readdirSync } from 'fs'
import { Collection, FilterQuery } from 'mongodb'
import { DatabaseHandler, Entry, TargetedEntry } from '../Database/Database'
import { Config } from '../Utility/Config'
import { Dictionary } from '../Utility/Dictionary'
import { EmbedConstructor } from '../Utility/EmbedConstructor'
import { FetchPermissions } from '../Utility/FetchPermissions'
import { CommandResult } from './CommandResult'
import { MK_Command } from './Commands'
import { ExecutionData } from './ExecutionData'

export { CommandHandler }

class CommandHandler {

    private static _commands: MK_Command[] = []
    private static _text: Dictionary<any>
    private static _guild: Guild

    public static async Load() {
        
        const dir: string = `${__dirname}/../../Commands`
        const files: string[] = readdirSync(dir)

        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const command: MK_Command = module.command 
            this._commands[i] = command
        }
    }

    public static async Run(message: Message) {

        let properties: { Prefixes: string[], Language: string } = await DatabaseHandler.ChannelSettings.findOne({ "ChannelId": message.channel.id })
        if(!properties) {

            properties = await DatabaseHandler.GuildSettings.findOne({ 'GuildId': message.channel.id })
            if(!properties)

                properties = { Prefixes: Config.Prefixes, Language: 'en-US'}
        }

        const prefix: string = properties.Prefixes.find(predicate => message.content.startsWith(predicate))
        const isMessageCommand: boolean = prefix ? true : false

        if(isMessageCommand) {

            const content = message.content.split(' ')
            const command = content[0].substring(prefix.length).toLowerCase()
            const executableCommand: MK_Command = this._commands.find(predicate => predicate.Usage.includes(command))
            
            const text = Config.BotStrings[properties.Language]
            const guild = message.guild
            this._text = text
            this._guild = message.guild

            if(executableCommand) {

                if(executableCommand.Access.Level == 'BotOwner' && message.author != Config.Owner)
                    return this.ExecutionError( text['only_for_owner'].replace('{owner}', '@' + Config.Owner.tag) )

                else if(executableCommand.Access.Level == 'BetaTesters' && !Config.BetaTesters.includes(message.author))
                    return this.ExecutionError( text['only_for_betatesters'] )

                else if(executableCommand.Access.Channels == 'DMs' && guild)
                    return this.ExecutionError( text['dms_only'] )

                else if(executableCommand.Access.Channels == 'Guilds' && !guild)
                    return this.ExecutionError( text['guild_only'] )

                else if(executableCommand.Access.Level == 'GuildOwner' && message.guild.owner != message.member)
                    return this.ExecutionError( text['guild_owner_only'].replace('{owner}', '@' + message.guild.owner.user.tag) )
                    
                else if(executableCommand.MemberPermissions.includes('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR'))
                    return this.ExecutionError( text['administrator_only'] )

                else if(message.guild && !message.member.permissions.has(executableCommand.MemberPermissions, true))
                    return this.ExecutionError( text['not_enough_permissions']['user'].replace('{required_permissions}', FetchPermissions(executableCommand.MemberPermissions, this._text)) )
                    
                else if(message.guild && !message.guild?.me.permissions.has(executableCommand.BotPermissions, true))
                    return this.ExecutionError( text['not_enough_permissions']['bot'].replace('{required_permissions}', FetchPermissions(executableCommand.BotPermissions, this._text)) )

                const currentTime = new Date().getTime()
                const cooldowns: Dictionary<{ Collection: Collection<Entry> | Collection<TargetedEntry>, Query: any }> = {

                    'Global': { Collection: DatabaseHandler.CC_Global, Query: { "Name": executableCommand.Name } }, 
                    'Guild': { Collection: DatabaseHandler.CC_Guilds, Query: { "Name": executableCommand.Name, "TargetId": message.guild.id } },
                    'Channel': { Collection: DatabaseHandler.CC_Channels, Query: { "Name": executableCommand.Name, "TargetId": message.channel.id } }, 
                    'User': { Collection: DatabaseHandler.CC_Users, Query: { "Name": executableCommand.Name, "TargetId": message.author.id } }
                }

                const collection = cooldowns[executableCommand.Cooldown.CooldownTarget]
                var cooldown = await collection.Collection.findOne(collection.Query)
    
                if(cooldown) {
    
                    if(currentTime >= cooldown.ExpireDate)
                        collection.Collection.deleteOne(cooldown)
                    else
                        return this.ExecutionError(text['command_is_on_cooldown'][executableCommand.Cooldown.CooldownTarget.toLowerCase()].replace('{time_left}', `${(cooldown.ExpireDate - currentTime) / 1000}`))
                }

                const context: ExecutionData = { 
                    Message: message, 
                    User: message.author, 
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(), 
                    Args: content.slice(1)
                }
                
                const result: CommandResult = executableCommand.Execute(context)
                const resultEmbed = result.Evaluate(text, message)
                if(resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed)

                if(result.IsSuccessful) {
                    
                    const schema = collection.Query;
                    schema.ExpireDate = currentTime + executableCommand.Cooldown.CooldownDuration;
                    await collection.Collection.insertOne(schema)
                }
            }

            else 
                return this.ExecutionError(text['command_isnt_found'])
        }
    }

    private static ExecutionError(body: string) : MessageEmbed {

        return EmbedConstructor.ConstructEmbed( { Text: this._text, Guild: this._guild }, this._text['command_execution_error'], body, Config.Colors['error'])
    }
}