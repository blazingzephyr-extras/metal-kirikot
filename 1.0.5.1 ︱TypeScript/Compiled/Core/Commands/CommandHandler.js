"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const fs_1 = require("fs");
const fs_2 = require("fs");
const Database_1 = require("../Database/Database");
const Config_1 = require("../Utility/Config");
const EmbedConstructor_1 = require("../Utility/EmbedConstructor");
const FetchPermissions_1 = require("../Utility/FetchPermissions");
class CommandHandler {
    static async Load() {
        const dir = `${__dirname}/../../Commands`;
        const files = fs_1.readdirSync(dir);
        for (let i in files) {
            const module = await Promise.resolve().then(() => require(`${dir}/${files[i]}`));
            const command = module.command;
            this._commands[i] = command;
        }
    }
    static async Run(message) {
        var _a, _b;
        const channel = message.channel;
        const type = message.channel.type;
        const id = channel.id;
        const guildId = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id;
        const query = { "ChannelId": id };
        const guildSettings = Database_1.Database.GuildSettings[guildId];
        /*let properties = type == "dm" ?
                        await Database.DMOverwrites.findOne(query) ?? { Prefixes: Config.Prefixes, Language: Config.Language } :
                        await guildSettings.ChannelOverwrites.findOne(query) ?? await guildSettings.Settings.findOne({})*/
        const prefix = message.content.startsWith('beta!');
        const isMessageCommand = prefix ? true : false;
        if (isMessageCommand) {
            const content = message.content.split(" ");
            const command = content[0].substring(5).toLowerCase();
            let executableCommand = this._commands.find(predicate => predicate.Usage.includes(command));
            if (!executableCommand && type != "dm") {
                const customCommand = await guildSettings.CustomCommands.findOne((query) => query.Usage.includes(command));
                if (customCommand) {
                    const filePath = `${__dirname}\\..\\Assets\\Downloads\\${message.id}`;
                    fs_2.writeFileSync(filePath, customCommand.Command);
                    executableCommand = await Promise.resolve().then(() => require(filePath));
                    fs_2.unlinkSync(filePath);
                }
            }
            const text = Config_1.Config.BotStrings['en-US'];
            const guild = message.guild;
            this._text = text;
            this._channel = channel;
            this._guild = guild;
            if (executableCommand) {
                console.log(Config_1.Config.Owner);
                if (executableCommand.Access.Level == "BotOwner" && message.author != Config_1.Config.Owner)
                    return this.ExecutionError(text["Only_for_owner"].replace("{owner}", "@" + Config_1.Config.Owner.tag));
                else if (executableCommand.Access.Level == "BetaTesters" && !Config_1.Config.BetaTesters.includes(message.author) && message.author != Config_1.Config.Owner)
                    return this.ExecutionError(text["Only_for_betatesters"]);
                else if (executableCommand.Access.Channels == "DMs" && guild)
                    return this.ExecutionError(text["Mms_only"]);
                else if (executableCommand.Access.Channels == "Guilds" && !guild)
                    return this.ExecutionError(text["Guild_only"]);
                else if (executableCommand.Access.Level == "GuildOwner" && message.guild.owner != message.member)
                    return this.ExecutionError(text["Guild_owner_only"].replace("{owner}", "@" + message.guild.owner.user.tag));
                else if (executableCommand.MemberPermissions.includes("ADMINISTRATOR") && !message.member.hasPermission("ADMINISTRATOR"))
                    return this.ExecutionError(text["Administrator_only"]);
                else if (message.guild && !message.member.permissions.has(executableCommand.MemberPermissions, true))
                    return this.ExecutionError(text["Not_enough_permissions"]["User"].replace("{required_permissions}", FetchPermissions_1.FetchPermissions(executableCommand.MemberPermissions, this._text)));
                else if (message.guild && !((_b = message.guild) === null || _b === void 0 ? void 0 : _b.me.permissions.has(executableCommand.BotPermissions, true)))
                    return this.ExecutionError(text["Not_enough_permissions"]["Bot"].replace("{required_permissions}", FetchPermissions_1.FetchPermissions(executableCommand.BotPermissions, this._text)));
                const currentTime = new Date().getTime();
                this.Cooldowns[''];
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
                const context = {
                    Message: message,
                    User: message.author,
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(),
                    Args: content.slice(1),
                    Text: text
                };
                const result = executableCommand.Execute(context);
                const resultEmbed = result.Evaluate(message, text);
                if (resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed);
                /*
                                if(result.IsSuccessful) {
                                    
                                    const schema = collection.Query;
                                    schema.ExpireDate = currentTime + executableCommand.Cooldown.Duration;
                                    await collection.Collection.insertOne(schema)
                                }*/
            }
            else
                return this.ExecutionError(text["command_isnt_found"]);
        }
    }
    static ExecutionError(body) {
        const embed = EmbedConstructor_1.EmbedConstructor.ConstructEmbed(this._text, this._guild, this._text["command_execution_error"], body, Config_1.Config.Colors["error"]);
        this._channel.send(embed);
    }
}
exports.CommandHandler = CommandHandler;
CommandHandler.Cooldowns = {};
CommandHandler._commands = [];
