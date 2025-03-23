const {RichEmbed} = require("discord.js")
const DateFormat = require("F:/Metal Kirikot/utils/DataFormat")

module.exports = (MetalKirikot, Database, Config, Text, message, args) => {
    
    let banMember = message.mentions.members.first() 
    let suppliedReason = args.slice(1).join(" ")
    let errorEmbed = new RichEmbed()
        .setTitle(Text.error)
        .setColor(Config.red)

    if(!message.member.hasPermission("BAN_MEMBERS")||!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.not_enough_permissions, Text.get_permission_to_ban, true),
    message.channel.send(errorEmbed)

    if(!message.guild.me.hasPermission("BAN_MEMBERS")||!message.guild.me.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.bot_have_no_pemissions, Text.give_permission_to_ban, true),
    message.channel.send(errorEmbed)

    if(!banMember) {
        if(!args[0]) {
            return errorEmbed.addField(Text.didnt_set_user_to_ban, Text.set_the_user, true),
            message.channel.send(errorEmbed)
        } else {
            banMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
            if(!banMember) {
                return errorEmbed.addField(Text.user_didnt_find, Text.give_users_name_or_mention, true),
                message.channel.send(errorEmbed)
            }
        }
    }

    if(banMember.user.toString() == message.author.toString()) return errorEmbed.addField(Text.cant_ban_yourself, "\u200B", true),
    message.channel.send(errorEmbed)

    if(banMember.toString() == message.guild.me.toString()) return errorEmbed.addField(Text.bot_cant_ban_himself, "\u200B", true),
    message.channel.send(errorEmbed)
    
    if(banMember.highestRole.position > message.member.highestRole.position) return errorEmbed.addField(Text.cant_ban_that_user1 + `**${banMember.user.tag}**` + Text.cant_ban_that_user2, Text.because_user_has_role_above, true),
    message.channel.send(errorEmbed)

    if(banMember == message.guild.owner) return errorEmbed.addField(Text.cant_ban_that_user1 + `**${banMember.user.tag}**` + Text.cant_ban_that_user2, Text.because_user_is_owner, true),
    message.channel.send(errorEmbed)
    
    if(banMember.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.cant_ban_that_user1 + `**${banMember.user.tag}**` + Text.cant_ban_that_user2, Text.because_user_is_administrator, true),
    message.channel.send(errorEmbed)

    if(banMember.user.tag === Config.creator_tag) return errorEmbed.addField(Text.cant_ban_that_user1 + `**${banMember.user.tag}**` + Text.cant_ban_that_user2, Text.because_user_is_creator_of_bot, true),
    message.channel.send(errorEmbed)

    if(!suppliedReason) return errorEmbed.addField(Text.didnt_give_the_reason_to_ban, Text.give_the_reason, true),
    message.channel.send(errorEmbed)

    let date = new Date
    let bannedAt = DateFormat(date)

    let date1 = kickMember.joinedAt
    let joinDate = DateFormat(date1)

    let successEmbed = new RichEmbed()
        .setTitle(Text.success)
        .setColor(Config.green)
        .addField(Text.successfully_banned1 + `**${banMember.user.tag}**` + Text.successfully_banned2, Text.reason + `${suppliedReason}*`, true)
    
    let logEmbed = new RichEmbed()
        .setAuthor(`${message.author.tag}${Text.event_banned1}${banMember.user.tag}${Text.event_banned2}`, message.author.displayAvatarURL)
        .setColor(Config.yellow)
        .setFooter(`${message.guild.me.displayName} | ${message.guild.name}`, message.guild.me.user.displayAvatarURL, true)
        .setImage(banMember.user.displayAvatarURL, true)
        .addField(Text.joined_guild, joinDate, true)
        .addField(Text.banned_by, message.author, true)
        .addField(Text.reason_why_banned, suppliedReason, true)
        .addField(Text.banned_at, bannedAt, true)
        .addField(Text.userID, banMember.user.id, true)

    String.prototype.replaceAll = function (string1, string2, ignore) {
        return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
    }

    let privateMessage = [new String()]
    Database[26].split(" ").forEach((part, i) => {
        let word = part
        let symbols = ["*", "_", "!", "_", "`", "$", "%", "#", "&", "^", "(", ")", "~", "-", "+", "-", "/", "{", "}"]
        symbols.forEach(symbol => {
            word = word.replaceAll(symbol, "")
        })

        if(word === "GUILD") {
            privateMessage[i] = part.replace("{GUILD}", message.guild.name)
        }
        else if(word === "REASON") {
            privateMessage[i] = part.replace("{REASON}", suppliedReason)
        }
        else {
            privateMessage[i] = part
        }
    })
    privateMessage = privateMessage.join(" ")

    banMember.user.send(privateMessage).then(() => {
        banMember.ban({
            reason: suppliedReason
        }).then(() => {
            message.channel.send(successEmbed)
            if(Database[4] === "enabled") {
                if(Database[5] === "~~") {
                    message.channel.send(logEmbed)
                } else {
                    message.guild.channels.find(channel => channel.id === Database[5]).send(logEmbed)
                }
            }
            else if(Database[4] === "disabled") {}
        }).catch(() => {
            errorEmbed.addField(Text.unable_to_ban_the_user, "\u200B", true),
            message.channel.send(errorEmbed)
        })
    }).catch(() => {
        errorEmbed.addField(Text.unable_to_ban_the_user, Text.because_bot_cant_send_a_message, true),
        message.channel.send(errorEmbed)
    })
}