import { DMChannel, Guild, Message, MessageEmbed, NewsChannel, TextChannel } from "discord.js"
import { readdirSync } from "fs"
import { Collection, FilterQuery } from "mongodb"
import { writeFileSync, unlinkSync } from "fs"
import { Database, CC_Entry, CC_TargetedEntry, CustomCommand } from "../Database/Database"
import { Config } from "../Utility/Config"
import { Dictionary } from "../Utility/Dictionary"
import { EmbedConstructor } from "../Utility/EmbedConstructor"
import { FetchPermissions } from "../Utility/FetchPermissions"
import { CommandResult } from "./CommandResult"
import { MK_Command } from "./CommandsЬщвгду"
import { ExecutionData } from "./ExecutionData"

export { CommandHandler }

class CommandHandler {

    public static Cooldowns: Dictionary<CC_Entry | CC_TargetedEntry> = {}
    private static _commands: MK_Command[] = []
    private static _text: Dictionary<any>
    private static _guild: Guild
    private static _channel: TextChannel | NewsChannel | DMChannel
    
    public static async Load() {
              
    }

    public static async Run(message: Message) {

        const channel = message.channel;
        const type = message.channel.type;
        const id = channel.id;
        const guildId = message.guild?.id;

        const query = { "ChannelId": id };
        const guildSettings = Database.GuildSettings[guildId]
        /*let properties = type == "dm" ?
                        await Database.DMOverwrites.findOne(query) ?? { Prefixes: Config.Prefixes, Language: Config.Language } :
                        await guildSettings.ChannelOverwrites.findOne(query) ?? await guildSettings.Settings.findOne({})*/

        const prefix = message.content.startsWith('beta!')
        const isMessageCommand: boolean = prefix ? true : false

        if(isMessageCommand) {

            const content = message.content.split(" ")
            const command = content[0].substring(5).toLowerCase()
            let executableCommand: MK_Command = this._commands.find(predicate => predicate.Usage.includes(command))

            if(!executableCommand && type != "dm") {

                const customCommand = await guildSettings.CustomCommands.findOne((query: CustomCommand) => query.Usage.includes(command))
                if(customCommand) {

                    const filePath = `${__dirname}\\..\\Assets\\Downloads\\${message.id}`
                    writeFileSync(filePath, customCommand.Command)
                    executableCommand = await import(filePath)
                    unlinkSync(filePath)
                }                    
            }

            const text = Config.BotStrings['en-US']
            const guild = message.guild
            this._text = text
            this._channel = channel
            this._guild = guild

            if(executableCommand) {

                console.log(Config.Owner)
                if(executableCommand.Access.Level == "BotOwner" && message.author != Config.Owner)
                    return this.ExecutionError(text["Only_for_owner"].replace("{owner}", "@" + Config.Owner.tag))

                else if(executableCommand.Access.Level == "BetaTesters" && !Config.BetaTesters.includes(message.author) && message.author != Config.Owner)
                    return this.ExecutionError(text["Only_for_betatesters"])

                else if(executableCommand.Access.Channels == "DMs" && guild)
                    return this.ExecutionError(text["Mms_only"])

                else if(executableCommand.Access.Channels == "Guilds" && !guild)
                    return this.ExecutionError(text["Guild_only"])

                else if(executableCommand.Access.Level == "GuildOwner" && message.guild.owner != message.member)
                    return this.ExecutionError(text["Guild_owner_only"].replace("{owner}", "@" + message.guild.owner.user.tag))
                    
                else if(executableCommand.MemberPermissions.includes("ADMINISTRATOR") && !message.member.hasPermission("ADMINISTRATOR"))
                    return this.ExecutionError(text["Administrator_only"])

                else if(message.guild && !message.member.permissions.has(executableCommand.MemberPermissions, true))
                    return this.ExecutionError(text["Not_enough_permissions"]["User"].replace("{required_permissions}", FetchPermissions(executableCommand.MemberPermissions, this._text)))
                    
                else if(message.guild && !message.guild?.me.permissions.has(executableCommand.BotPermissions, true))
                    return this.ExecutionError(text["Not_enough_permissions"]["Bot"].replace("{required_permissions}", FetchPermissions(executableCommand.BotPermissions, this._text)))

                const currentTime = new Date().getTime();
                this.Cooldowns['']



                /*const currentTime = new Date().getTime()
                const cooldowns: Dictionary<{ Collection: Collection<CC_Entry> | Collection<CC_TargetedEntry>, Query: any }> = {

                    "Global": { Collection: Database.CC_Global, Query: { "Name": executableCommand.Name } }, 
                    "Guild": { Collection: Database.CC_Guilds, Query: { "Name": executableCommand.Name, "TargetId": message.guild.id } },
                    "Channel": { Collection: Database.CC_Channels, Query: { "Name": executableCommand.Name, "TargetId": message.channel.id } }, 
                    "User": { Collection: Database.CC_Users, Query: { "Name": executableCommand.Name, "TargetId": message.author.id } }
                }

                const collection = cooldowns[executableCommand.Cooldown.Target]
                var cooldown = await collection.Collection.findOne(collection.Query)
    
                if(cooldown) {
    
                    if(currentTime >= cooldown.ExpireDate)
                        collection.Collection.deleteOne(cooldown)
                    else
                        return this.ExecutionError(text["Command_is_on_cooldown"][executableCommand.Cooldown.Target.toLowerCase()].replace("{time_left}", `${(cooldown.ExpireDate - currentTime) / 1000}`))
                }*/

                const context: ExecutionData = { 
                    Message: message, 
                    User: message.author, 
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(), 
                    Args: content.slice(1),
                    Text: text
                }
                
                const result: CommandResult = executableCommand.Execute(context)
                const resultEmbed = result.Evaluate(message, text)
                if(resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed)
/*
                if(result.IsSuccessful) {
                    
                    const schema = collection.Query;
                    schema.ExpireDate = currentTime + executableCommand.Cooldown.Duration;
                    await collection.Collection.insertOne(schema)
                }*/
            }

            else
                return this.ExecutionError(text["command_isnt_found"])
        }
    }

    private static ExecutionError(body: string) {

        const embed = EmbedConstructor.ConstructEmbed(this._text, this._guild, this._text["command_execution_error"], body, Config.Colors["error"])
        this._channel.send(embed)
    }
}