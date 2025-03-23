import { Message } from 'discord.js'
import { readdirSync } from 'fs'
import { Config } from '../General Utils/Config'
import { Database } from '../General Utils/Database'
import { CommandContext } from './CommandContext'
import { CommandResult } from './CommandResult'
import { Command } from './Index'

export { CommandHandler, CommandCooldown, SpecifiedCooldown }

interface CommandCooldown { 

    CommandName: string, 
    ExpireDate: number
}

interface SpecifiedCooldown extends CommandCooldown {
    
    Id: string
}

class CommandHandler {

    private static _commands: Command[] = []

    public static async Load() : Promise<void> {
        
        const dir = `${__dirname}/../../Commands`
        const files: string[] = readdirSync(dir)
        for(let i in files) {

            const module = await import(`${dir}/${files[i]}`)
            const command: Command = module.command 
            this._commands[i] = command
        }
    }

    public static async Run (message: Message) : Promise<void> {

        let supportedPrefixes: string[] = message.guild ? Database.GuildSettings[message.guild.id].SupportedPrefixes : Config.DefaultPrefixes
        let prefix = ''
        let isMessageCommand = false
        for (let i in supportedPrefixes) {

            const startsWith: boolean = message.content.toLowerCase().startsWith(supportedPrefixes[i])
            if(startsWith) { 
                
                isMessageCommand = true
                prefix = supportedPrefixes[i]
                break
            }
        }

        if(isMessageCommand) {

            const content = message.content.split(' ')
            const command = content[0].replace(prefix, '').toLowerCase()
            const runnableCommand: Command = this._commands.find(preficate => preficate.Usage.includes(command))

            if(runnableCommand) {

                if(runnableCommand.CommandAccess.AccessLevel == 'BotOwner' && message.author != Config.Owner) {
                    
                    message.channel.send("You aren't bot owner")
                    return
                }

                if(runnableCommand.CommandAccess.AccessLevel == 'BetaTesters' && !Config.BetaTesters.includes(message.author)) {

                    message.channel.send("You aren't a beta tester")
                    return
                }

                if(runnableCommand.CommandAccess.ChannelAccess == 'DMsOnly' && message.guild) {

                    message.channel.send("This command can be used only in DMs!")
                    return
                }
                
                if(runnableCommand.CommandAccess.ChannelAccess == 'GuildOnly' && !message.guild) {

                    message.channel.send("This command can be used only on the servers!")
                    return
                }

                if(runnableCommand.CommandAccess.AccessLevel == 'GuildOwnerOnly' && message.guild?.owner != message.member) {

                    message.channel.send("You aren't a guild owner")
                    return
                }

                if(runnableCommand.CommandAccess.AccessLevel == 'AdminOnly' && !message.member.hasPermission('ADMINISTRATOR')) {

                    message.channel.send("You aren't an admin")
                    return
                }

                if(!message.member.permissions.has(runnableCommand.RequiredPermissions, true)) {
                    
                    message.channel.send("Not enough perms lel")
                    return
                }

                const currentTime = new Date().getTime()
                const globalCooldown = await Database.Global.findOne({ "CommandName": runnableCommand.Name })
                if(globalCooldown) {

                    if(currentTime >= globalCooldown.ExpireDate) 
                        Database.Global.deleteOne(globalCooldown)
                    else {

                        message.channel.send(`This command isn't recharged yet! Wait more for ${(globalCooldown.ExpireDate - currentTime) / 1000} seconds!`)
                        return
                    }
                }

                let guildCooldown: SpecifiedCooldown
                if(message.guild) {

                    guildCooldown = await Database.Guild.findOne<SpecifiedCooldown>({ "CommandName": runnableCommand.Name, "Id": message.guild.id })
                    if(guildCooldown) {
    
                        if(currentTime >= guildCooldown.ExpireDate) 
                            Database.Guild.deleteOne(guildCooldown)
                        else {

                            message.channel.send(`This command isn't recharged for this guild yet! Wait more for ${(guildCooldown.ExpireDate - currentTime) / 1000} seconds!`)
                            return
                        }
                    }
                }

                const channelCooldown = await Database.Channel.findOne<SpecifiedCooldown>({ "CommandName": runnableCommand.Name, "Id": message.channel.id })
                if(channelCooldown) {

                    if(currentTime >= channelCooldown.ExpireDate) 
                        Database.Channel.deleteOne(channelCooldown)
                    else {

                        message.channel.send(`This command isn't recharged for this channel yet! Wait more for ${(channelCooldown.ExpireDate - currentTime) / 1000} seconds!`)
                        return
                    }
                }

                const userCooldown = await Database.User.findOne<SpecifiedCooldown>({ "CommandName": runnableCommand.Name, "Id": message.author.id })
                if(userCooldown && currentTime < userCooldown.ExpireDate) {

                    message.channel.send(`This command isn't recharged for this user yet! Wait more for ${(userCooldown.ExpireDate - currentTime) / 1000} seconds!`)
                    return
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
                const resultEmbed = result.ConstructEmbed(message)
                if(resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed)

                const expireTime = currentTime + runnableCommand.Cooldown.Cooldown
                switch(runnableCommand.Cooldown.CooldownBucket) {

                    case 'Global': Database.Global.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime })
                    case 'Guild': Database.Guild.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.guild.id })
                    case 'Channel': Database.Channel.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.channel.id })
                    case 'User': Database.User.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.author.id })
                }
            }

            else {

                message.channel.send("bruh")
            }
        }
    }
}