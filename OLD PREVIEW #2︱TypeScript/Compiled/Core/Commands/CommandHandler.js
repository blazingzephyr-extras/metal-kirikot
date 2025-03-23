"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const fs_1 = require("fs");
const Config_1 = require("../General Utils/Config");
const Database_1 = require("../General Utils/Database");
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
        var _a;
        let supportedPrefixes = message.guild ? Database_1.Database.GuildSettings[message.guild.id].SupportedPrefixes : Config_1.Config.DefaultPrefixes;
        let prefix = '';
        let isMessageCommand = false;
        for (let i in supportedPrefixes) {
            const startsWith = message.content.toLowerCase().startsWith(supportedPrefixes[i]);
            if (startsWith) {
                isMessageCommand = true;
                prefix = supportedPrefixes[i];
                break;
            }
        }
        if (isMessageCommand) {
            const content = message.content.split(' ');
            const command = content[0].replace(prefix, '').toLowerCase();
            const runnableCommand = this._commands.find(preficate => preficate.Usage.includes(command));
            if (runnableCommand) {
                if (runnableCommand.CommandAccess.AccessLevel == 'BotOwner' && message.author != Config_1.Config.Owner) {
                    message.channel.send("You aren't bot owner");
                    return;
                }
                if (runnableCommand.CommandAccess.AccessLevel == 'BetaTesters' && !Config_1.Config.BetaTesters.includes(message.author)) {
                    message.channel.send("You aren't a beta tester");
                    return;
                }
                if (runnableCommand.CommandAccess.ChannelAccess == 'DMsOnly' && message.guild) {
                    message.channel.send("This command can be used only in DMs!");
                    return;
                }
                if (runnableCommand.CommandAccess.ChannelAccess == 'GuildOnly' && !message.guild) {
                    message.channel.send("This command can be used only on the servers!");
                    return;
                }
                if (runnableCommand.CommandAccess.AccessLevel == 'GuildOwnerOnly' && ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.owner) != message.member) {
                    message.channel.send("You aren't a guild owner");
                    return;
                }
                if (runnableCommand.CommandAccess.AccessLevel == 'AdminOnly' && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.channel.send("You aren't an admin");
                    return;
                }
                if (!message.member.permissions.has(runnableCommand.RequiredPermissions, true)) {
                    message.channel.send("Not enough perms lel");
                    return;
                }
                const currentTime = new Date().getTime();
                const globalCooldown = await Database_1.Database.Global.findOne({ "CommandName": runnableCommand.Name });
                if (globalCooldown) {
                    if (currentTime >= globalCooldown.ExpireDate)
                        Database_1.Database.Global.deleteOne(globalCooldown);
                    else {
                        message.channel.send(`This command isn't recharged yet! Wait more for ${(globalCooldown.ExpireDate - currentTime) / 1000} seconds!`);
                        return;
                    }
                }
                let guildCooldown;
                if (message.guild) {
                    guildCooldown = await Database_1.Database.Guild.findOne({ "CommandName": runnableCommand.Name, "Id": message.guild.id });
                    if (guildCooldown) {
                        if (currentTime >= guildCooldown.ExpireDate)
                            Database_1.Database.Guild.deleteOne(guildCooldown);
                        else {
                            message.channel.send(`This command isn't recharged for this guild yet! Wait more for ${(guildCooldown.ExpireDate - currentTime) / 1000} seconds!`);
                            return;
                        }
                    }
                }
                const channelCooldown = await Database_1.Database.Channel.findOne({ "CommandName": runnableCommand.Name, "Id": message.channel.id });
                if (channelCooldown) {
                    if (currentTime >= channelCooldown.ExpireDate)
                        Database_1.Database.Channel.deleteOne(channelCooldown);
                    else {
                        message.channel.send(`This command isn't recharged for this channel yet! Wait more for ${(channelCooldown.ExpireDate - currentTime) / 1000} seconds!`);
                        return;
                    }
                }
                const userCooldown = await Database_1.Database.User.findOne({ "CommandName": runnableCommand.Name, "Id": message.author.id });
                if (userCooldown && currentTime < userCooldown.ExpireDate) {
                    message.channel.send(`This command isn't recharged for this user yet! Wait more for ${(userCooldown.ExpireDate - currentTime) / 1000} seconds!`);
                    return;
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
                const resultEmbed = result.ConstructEmbed(message);
                if (resultEmbed.SendMessage)
                    message.channel.send(resultEmbed.MessageEmbed);
                const expireTime = currentTime + runnableCommand.Cooldown.Cooldown;
                switch (runnableCommand.Cooldown.CooldownBucket) {
                    case 'Global': Database_1.Database.Global.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime });
                    case 'Guild': Database_1.Database.Guild.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.guild.id });
                    case 'Channel': Database_1.Database.Channel.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.channel.id });
                    case 'User': Database_1.Database.User.insertOne({ 'CommandName': runnableCommand.Name, 'ExpireDate': expireTime, 'Id': message.author.id });
                }
            }
            else {
                message.channel.send("bruh");
            }
        }
    }
}
exports.CommandHandler = CommandHandler;
CommandHandler._commands = [];
