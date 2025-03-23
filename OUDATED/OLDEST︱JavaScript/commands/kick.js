const {RichEmbed} = require("discord.js")
const DateFormat = require("F:/Metal Kirikot/utils/DataFormat")

module.exports = (MetalKirikot, Database, Config, Text, message, args) => {
    
    let kickMember = message.mentions.members.first() 
    let suppliedReason = args.slice(1).join(" ")
    let errorEmbed = new RichEmbed()
        .setTitle(Text.error)
        .setColor(Config.red)

    if(!message.member.hasPermission("KICK_MEMBERS")||!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.not_enough_permissions, Text.get_permission_to_kick, true),
    message.channel.send(errorEmbed)

    if(!message.guild.me.hasPermission("KICK_MEMBERS")||!message.guild.me.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.bot_have_no_pemissions, Text.give_permission_to_kick, true),
    message.channel.send(errorEmbed)

    if(!kickMember) {
        if(!args[0]) {
            return errorEmbed.addField(Text.didnt_set_user_to_kick, Text.set_the_user, true),
            message.channel.send(errorEmbed)
        } else {
            kickMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
            if(!kickMember) {
                return errorEmbed.addField(Text.user_didnt_find, Text.give_users_name_or_mention, true),
                message.channel.send(errorEmbed)
            }
        }
    }

    if(kickMember.user.toString() == message.author.toString()) return errorEmbed.addField(Text.cant_kick_yourself, "\u200B", true),
    message.channel.send(errorEmbed)

    if(kickMember.toString() == message.guild.me.toString()) return errorEmbed.addField(Text.bot_cant_kick_himself, "\u200B", true),
    message.channel.send(errorEmbed)
    
    if(kickMember.highestRole.position > message.member.highestRole.position) return errorEmbed.addField(Text.cant_kick_that_user1 + `**${kickMember.user.tag}**` + Text.cant_kick_that_user2, Text.because_user_has_role_above, true),
    message.channel.send(errorEmbed)

    if(kickMember == message.guild.owner) return errorEmbed.addField(Text.cant_kick_that_user1 + `**${kickMember.user.tag}**` + Text.cant_kick_that_user2, Text.because_user_is_owner, true),
    message.channel.send(errorEmbed)
    
    if(kickMember.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.cant_kick_that_user1 + `**${kickMember.user.tag}**` + Text.cant_kick_that_user2, Text.because_user_is_administrator, true),
    message.channel.send(errorEmbed)

    if(kickMember.user.tag === Config.creator_tag) return errorEmbed.addField(Text.cant_kick_that_user1 + `**${banMember.user.tag}**` + Text.cant_kick_that_user2, Text.because_user_is_creator_of_bot, true),
    message.channel.send(errorEmbed)

    if(!suppliedReason) return errorEmbed.addField(Text.didnt_give_the_reason_to_kick, Text.give_the_reason, true),
    message.channel.send(errorEmbed)

    let date = new Date
    let kickedAt = DateFormat(date)

    let date1 = kickMember.joinedAt
    let joinDate = DateFormat(date1)

    let successEmbed = new RichEmbed()
        .setTitle(Text.success)
        .setColor(Config.green)
        .addField(Text.successfully_kicked1 + `**${kickMember.user.tag}**` + Text.successfully_kicked2, Text.reason + `${suppliedReason}*`, true)
    
    let logEmbed = new RichEmbed()
        .setAuthor(`${message.author.tag}${Text.event_kicked1}${kickMember.user.tag}${Text.event_kicked2}`, message.author.displayAvatarURL)
        .setColor(Config.yellow)
        .setFooter(`${message.guild.me.displayName} | ${message.guild.name}`, message.guild.me.user.displayAvatarURL, true)
        .setImage(kickMember.user.displayAvatarURL, true)
        .addField(Text.joined_guild, joinDate, true)
        .addField(Text.kicked_by, message.author, true)
        .addField(Text.reason_why_kicked, suppliedReason, true)
        .addField(Text.kicked_at, kickedAt, true)
        .addField(Text.userID, kickMember.user.id, true)

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

    kickMember.user.send(privateMessage).then(() => {
        kickMember.kick(suppliedReason).then(() => {
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
            errorEmbed.addField(Text.unable_to_kick_the_user, "\u200B", true),
            message.channel.send(errorEmbed)
        })
    }).catch(() => {
        errorEmbed.addField(Text.unable_to_kick_the_user, Text.because_bot_cant_send_a_message, true),
        message.channel.send(errorEmbed)
    })
}