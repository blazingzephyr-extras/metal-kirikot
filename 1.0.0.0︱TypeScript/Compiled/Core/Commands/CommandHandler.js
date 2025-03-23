"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const Main_1 = require("../../Main");
const Database_1 = require("../Database/Database");
const Config_1 = require("../Utility/Config");
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
        var _a, _b, _c;
        const properties = await Database_1.Database.ChannelSettings.findOne({ "ChannelId": message.channel.id });
        const prefix = properties.Prefixes.find(predicate => message.content.startsWith(predicate));
        const isMessageCommand = prefix ? true : false;
        if (isMessageCommand) {
            const content = message.content.split(' ');
            const command = content[0].substring(prefix.length).toLowerCase();
            const runnableCommand = this._commands.find(predicate => predicate.Usage.includes(command));
            this._guild = message.guild;
            this._text = Config_1.BotStrings[properties.Language];
            this._channel = message.channel;
            if (runnableCommand) {
                if (runnableCommand.CommandAccess.AccessLevel == 'BotOwner' && message.author != Config_1.Config.Owner)
                    return this.ErrorEmbed(this._text['only_for_owner'].replace('{owner}', Config_1.Config.Owner.tag));
                else if (runnableCommand.CommandAccess.AccessLevel == 'BetaTesters' && !Config_1.Config.BetaTesters.includes(message.author))
                    return this.ErrorEmbed(this._text['only_for_betatesters']);
                else if (runnableCommand.CommandAccess.ChannelAccess == 'DMsOnly' && this._guild)
                    return this.ErrorEmbed(this._text['dms_only']);
                else if (runnableCommand.CommandAccess.ChannelAccess == 'GuildOnly' && !this._guild)
                    return this.ErrorEmbed(this._text['guild_only']);
                else if (runnableCommand.CommandAccess.AccessLevel == 'GuildOwnerOnly' && message.guild.owner != message.member)
                    return this.ErrorEmbed(this._text['guild_owner_only'].replace('{owner}', message.guild.owner.user.tag));
                else if (runnableCommand.MemberPermissions.includes('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR'))
                    return this.ErrorEmbed(this._text['administrator_only']);
                else if (message.guild && !((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(runnableCommand.MemberPermissions, true)))
                    return this.ErrorEmbed(this._text['not_enough_permissions']['user'].replace('{required_permissions}', `**${runnableCommand.MemberPermissions.join(', ')}**`));
                else if (message.guild && !((_b = message.guild) === null || _b === void 0 ? void 0 : _b.me.permissions.has(runnableCommand.BotPermissions, true)))
                    return this.ErrorEmbed(this._text['not_enough_permissions']['bot'].replace('{required_permissions}', `**${runnableCommand.BotPermissions.join(', ')}**`));
                const currentTime = new Date().getTime();
                const cooldowns = [
                    { Name: 'global', Collection: Database_1.Database.Global },
                    { Name: 'users', Collection: Database_1.Database.Users, TargetId: message.author.id },
                    { Name: 'channels', Collection: Database_1.Database.Channels, TargetId: message.channel.id },
                    { Name: 'guilds', Collection: Database_1.Database.Guilds, TargetId: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id },
                ];
                for (var i in cooldowns) {
                    const schema = cooldowns[i].TargetId == undefined ? { "Name": runnableCommand.Name } : { "Name": runnableCommand.Name, "TargetId": cooldowns[i].TargetId };
                    var cooldown = await cooldowns[i].Collection.findOne(schema);
                    if (cooldown) {
                        if (currentTime >= cooldown.ExpireDate)
                            cooldowns[i].Collection.deleteOne(cooldown);
                        else
                            return this.ErrorEmbed(this._text['command_is_on_cooldown'][cooldowns[i].Name].replace('{time_left}', `${(cooldown.ExpireDate - currentTime) / 1000}`));
                    }
                }
                const context = {
                    Client: message.client,
                    Message: message,
                    User: message.author,
                    Channel: message.channel,
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(),
                    Args: content.slice(1)
                };
                const result = runnableCommand.Execute(context);
                const resultEmbed = result.ConstructEmbed(this._text, message);
                if (resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed);
                if (result.IsSuccessful) {
                    const schema = { 'Name': runnableCommand.Name, 'ExpireDate': currentTime + runnableCommand.Cooldown.Cooldown };
                    let collection;
                    switch (runnableCommand.Cooldown.CooldownBucket) {
                        case 'Global':
                            collection = Database_1.Database.Global;
                            break;
                        case 'Guild':
                            collection = Database_1.Database.Guilds;
                            schema.TargetId = message.guild.id;
                            break;
                        case 'Channel':
                            collection = Database_1.Database.Channels;
                            schema.TargetId = message.channel.id;
                            break;
                        case 'User':
                            collection = Database_1.Database.Users;
                            schema.TargetId = message.author.id;
                            break;
                    }
                    await collection.insertOne(schema);
                }
            }
            else
                return this.ErrorEmbed(this._text['command_wasnt_found'].replace('{prefix}', prefix));
        }
    }
    static ErrorEmbed(body) {
        const embed = new discord_js_1.MessageEmbed({
            title: this._text['command_exec_error'],
            description: body,
            color: Config_1.Config.Colors['red_error'],
            timestamp: new Date().getTime(),
            author: {
                name: this._text['bot_created_by'].replace('{owner}', Config_1.Config.Owner.tag),
                iconURL: Config_1.Config.Owner.avatarURL(),
                url: Config_1.Config.Server
            },
            footer: this._guild ? { text: `${this._guild.name} • ${this._guild.me.displayName}`, iconURL: this._guild.iconURL() } :
                { text: Main_1.client.user.username, iconURL: Main_1.client.user.avatarURL() }
        });
        this._channel.send(embed);
    }
}
exports.CommandHandler = CommandHandler;
CommandHandler._commands = [];
