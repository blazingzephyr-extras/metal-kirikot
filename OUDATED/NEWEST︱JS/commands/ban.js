module.exports = {
    name: "Ban",
    description: "Bans user from the server!",
    group: "Moderation",
    timeout: 5000,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const FS = require("fs")
        const {RichEmbed} = require("discord.js")

        let banMember = message.mentions.members.first()
        let suppliedReason = args.slice(1).join(" ")
        let errorEmbed = new RichEmbed()
            .setTitle(Text.error)
            .setColor(Config.red)

        if(!message.member.hasPermission("BAN_MEMBERS")||!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.not_enough_permissions, Text.get_permission_to_ban, false),
        message.channel.send(errorEmbed)

        if(!message.guild.me.hasPermission("BAN_MEMBERS")||!message.guild.me.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.bot_have_not_enough_permissions, Text.give_me_permission_to_ban, false),
        message.channel.send(errorEmbed)

        String.prototype.replaceAll = function (string1, string2, ignore) {
            return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
        }
        if(!banMember)
        {
            if(!args[0]) {
                return errorEmbed.addField(Text.didnt_set_user_to_ban, Text.set_the_user, false),
                message.channel.send(errorEmbed)
            }
            else {
                banMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase().replaceAll("_", " "))
                if(!banMember)
                {
                    banMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
                    if(!banMember)
                    {
                        banMember = message.guild.members.find(member => member.id == args[0])
                        if(!banMember)
                        {
                            return errorEmbed.addField(Text.user_didnt_find, Text.give_users_name_id_or_mention, false),
                            message.channel.send(errorEmbed)                            
                        }
                    }
                }
            }
        }

        if(banMember.user.toString() == message.author.toString()) return errorEmbed.addField(Text.cant_ban_yourself, "\u200B", false),
        message.channel.send(errorEmbed)
    
        if(banMember.toString() == message.guild.me.toString()) return errorEmbed.addField(Text.bot_cant_ban_himself, "\u200B", false),
        message.channel.send(errorEmbed)
        
        if(banMember.highestRole.position > message.member.highestRole.position) return errorEmbed.addField(Text.cant_ban_that_user[0] + `**${banMember.user.tag}**` + Text.cant_ban_that_user[1], Text.because_user_has_role_above, false),
        message.channel.send(errorEmbed)
    
        if(banMember == message.guild.owner) return errorEmbed.addField(Text.cant_ban_that_user[0] + `**${banMember.user.tag}**` + Text.cant_ban_that_user[1], Text.because_user_is_owner, false),
        message.channel.send(errorEmbed)

        if(banMember.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.cant_ban_that_user[0] + `**${banMember.user.tag}**` + Text.cant_ban_that_user[1], Text.because_user_is_administrator, false),
        message.channel.send(errorEmbed)
    
        if(banMember.user.tag === Config.creator_tag) return errorEmbed.addField(Text.cant_ban_that_user[0] + `**${banMember.user.tag}**` + Text.cant_ban_that_user[1], Text.because_user_is_creator_of_bot, false),
        message.channel.send(errorEmbed)

        if(!suppliedReason) return errorEmbed.addField(Text.didnt_give_the_reason_to_ban, Text.give_the_reason, false),
        message.channel.send(errorEmbed)
    
        let date = new Date
        let bannedAt = Functions[0](date, Text)
    
        let date1 = banMember.joinedAt
        let joinDate = Functions[0](date1, Text)

        let successEmbed = new RichEmbed()
            .setTitle(Text.success)
            .setColor(Config.green)
            .addField(Text.successfully_banned[0] + `**${banMember.user.tag}**` + Text.successfully_banned[1], Text.reason + `${suppliedReason}*`, false)
            .setImage("https://cdn.discordapp.com/attachments/637638264483872771/647392797175054346/ban_hammer.png")

        let logEmbed = new RichEmbed()
            .setAuthor(`${message.author.tag}${Text.event_banned[0]}${banMember.user.tag}${Text.event_banned[1]}`, message.author.displayAvatarURL)
            .setColor(Config.yellow)
            .setFooter(`${message.guild.me.displayName} | ${message.guild.name}`, message.guild.me.user.displayAvatarURL, false)
            .setImage(banMember.user.displayAvatarURL, false)
            .addField(Text.joined_guild, joinDate, false)
            .addField(Text.banned_by, message.author, false)
            .addField(Text.reason_why_banned, suppliedReason, false)
            .addField(Text.banned_at, bannedAt, false)
            .addField(Text.userID, banMember.user.id, false)

        let privateMessage = [new String()]
        Database[6].split(" ").forEach((part, i) => {
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

        let confirmationEmbed = new RichEmbed()
            .setTitle(Text.are_you_sure)
            .setColor(Config.yellow)
            .addField(Text.react_to_this_message[0] + Text.react_to_this_message[2], Text.this_will_expire_in[0] + 5 + Text.this_will_expire_in[1])

        message.channel.send(confirmationEmbed).then(confirmationMessage => {
            confirmationMessage.react('✅').then(() => confirmationMessage.react('❌'))

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id
            }
            
            confirmationMessage.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first()
            
                    if (reaction.emoji.name === '✅') {

                        banMember.user.send(privateMessage).then(() => {

                            FS.readFile(`F:/Metal Kirikot/data/bans/${message.guild.id}.txt`, 'utf8', (err, data) => {
                                let write = new String()
                                if(data == "")
                                {
                                    write = `${banMember.user.tag.replaceAll(" ", "_")} ${banMember.id} ${message.author.tag.replaceAll(" ", "_")} ${suppliedReason.replaceAll(" ", "_")} ${joinDate.replaceAll(" ", "_")} ${bannedAt.replaceAll(" ", "_")}` 
                                } else {
                                    write = data + "\n" + `${banMember.user.tag.replaceAll(" ", "_")} ${banMember.id} ${message.author.tag.replaceAll(" ", "_")} ${suppliedReason.replaceAll(" ", "_")} ${joinDate.replaceAll(" ", "_")} ${bannedAt.replaceAll(" ", "_")}` 
                                }

                                banMember.ban({
                                    reason: suppliedReason
                                }).then(() => {
    
                                    message.channel.send(successEmbed)
                                    FS.writeFile(`F:/Metal Kirikot/data/bans/${message.guild.id}.txt`, write, () => {

                                        if(Database[2] === "enabled") {
    
                                            if(Database[3] === "~~") {
                                                message.channel.send(logEmbed)
                                            } else {
                                                message.guild.channels.find(channel => channel.id === Database[3]).send(logEmbed)
                                            }
                                        }
                                        else if(Database[2] === "disabled") {}
                                    })
                                }).catch(() => {
                                    errorEmbed.addField(Text.unable_to_ban_the_user, "\u200B", false),
                                    message.channel.send(errorEmbed)
                                })
                            })
                        }).catch(() => {
                            errorEmbed.addField(Text.unable_to_ban_the_user, Text.because_bot_cant_send_a_message, false),
                            message.channel.send(errorEmbed)
                        })
                    }
                    else {
                        message.channel.send(`${Text.banning_canceled}<@${banMember.id}>!`)
                    }
                })
                .catch(() => {
                    confirmationMessage.delete(),
                    message.delete()
                })
        })
    }
}