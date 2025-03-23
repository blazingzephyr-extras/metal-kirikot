module.exports = {
    name: "Kick",
    description: "Kicks user from the server!",
    group: "Moderation",
    timeout: 5000,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const {RichEmbed} = require("discord.js")

        let kickMember = message.mentions.members.first()
        let suppliedReason = args.slice(1).join(" ")
        let errorEmbed = new RichEmbed()
            .setTitle(Text.error)
            .setColor(Config.red)

        if(!message.member.hasPermission("KICK_MEMBERS")||!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.not_enough_permissions, Text.get_permission_to_kick, false),
        message.channel.send(errorEmbed)

        if(!message.guild.me.hasPermission("KICK_MEMBERS")||!message.guild.me.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.bot_have_not_enough_permissions, Text.give_me_permission_to_kick, false),
        message.channel.send(errorEmbed)

        String.prototype.replaceAll = function (string1, string2, ignore) {
            return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
        }
        if(!kickMember)
        {
            if(!args[0]) {
                return errorEmbed.addField(Text.didnt_set_user_to_kick, Text.set_the_user, false),
                message.channel.send(errorEmbed)
            }
            else {
                kickMember = message.guild.members.find(member => member.displayName.toLowerCase() === this)
                if(!kickMember)
                {
                    kickMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
                    if(!kickMember)
                    {
                        kickMember = message.guild.members.find(member => member.id == args[0])
                        if(!kickMember)
                        {
                            return errorEmbed.addField(Text.user_didnt_find, Text.give_users_name_id_or_mention, false),
                            message.channel.send(errorEmbed)                            
                        }
                    }
                }
            }
        }

        if(kickMember.user.toString() == message.author.toString()) return errorEmbed.addField(Text.cant_kick_yourself, "\u200B", false),
        message.channel.send(errorEmbed)
    
        if(kickMember.toString() == message.guild.me.toString()) return errorEmbed.addField(Text.bot_cant_kick_himself, "\u200B", false),
        message.channel.send(errorEmbed)
        
        if(kickMember.highestRole.position > message.member.highestRole.position) return errorEmbed.addField(Text.cant_kick_that_user[0] + `**${kickMember.user.tag}**` + Text.cant_kick_that_user[1], Text.because_user_has_role_above, false),
        message.channel.send(errorEmbed)
    
        if(kickMember == message.guild.owner) return errorEmbed.addField(Text.cant_kick_that_user[0] + `**${kickMember.user.tag}**` + Text.cant_kick_that_user[1], Text.because_user_is_owner, false),
        message.channel.send(errorEmbed)

        if(kickMember.hasPermission("ADMINISTRATOR")) return errorEmbed.addField(Text.cant_kick_that_user[0] + `**${kickMember.user.tag}**` + Text.cant_kick_that_user[1], Text.because_user_is_administrator, false),
        message.channel.send(errorEmbed)
    
        if(kickMember.user.tag === Config.creator_tag) return errorEmbed.addField(Text.cant_kick_that_user[0] + `**${banMember.user.tag}**` + Text.cant_kick_that_user[1], Text.because_user_is_creator_of_bot, false),
        message.channel.send(errorEmbed)

        if(!suppliedReason) return errorEmbed.addField(Text.didnt_give_the_reason_to_kick, Text.give_the_reason, false),
        message.channel.send(errorEmbed)
    
        let date = new Date
        let kickedAt = Functions[0](date, Text)
    
        let date1 = kickMember.joinedAt
        let joinDate = Functions[0](date1, Text)

        let successEmbed = new RichEmbed()
            .setTitle(Text.success)
            .setColor(Config.green)
            .addField(Text.successfully_kicked[0] + `**${kickMember.user.tag}**` + Text.successfully_kicked[1], Text.reason + `${suppliedReason}*`, false)

        let logEmbed = new RichEmbed()
            .setAuthor(`${message.author.tag}${Text.event_kicked[0]}${kickMember.user.tag}${Text.event_kicked[1]}`, message.author.displayAvatarURL)
            .setColor(Config.yellow)
            .setFooter(`${message.guild.me.displayName} | ${message.guild.name}`, message.guild.me.user.displayAvatarURL, false)
            .setImage(kickMember.user.displayAvatarURL, false)
            .addField(Text.joined_guild, joinDate, false)
            .addField(Text.kicked_by, message.author, false)
            .addField(Text.reason_why_kicked, suppliedReason, false)
            .addField(Text.kicked_at, kickedAt, false)
            .addField(Text.userID, kickMember.user.id, false)

        String.prototype.replaceAll = function (string1, string2, ignore) {
            return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
        }

        let privateMessage = [new String()]
        Database[5].split(" ").forEach((part, i) => {
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
            .addField(Text.react_to_this_message[0] + Text.react_to_this_message[1], Text.this_will_expire_in[0] + 5 + Text.this_will_expire_in[1])

        message.channel.send(confirmationEmbed).then(confirmationMessage => {
            confirmationMessage.react('✅').then(() => confirmationMessage.react('❌'))

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id
            }
            
            confirmationMessage.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first()
            
                    if (reaction.emoji.name === '✅') {

                        kickMember.user.send(privateMessage).then(() => {

                            kickMember.kick(suppliedReason).then(() => {

                                message.channel.send(successEmbed)
                                if(Database[2] === "enabled") {

                                    if(Database[3] === "~~") {
                                        message.channel.send(logEmbed)
                                    } else {
                                        message.guild.channels.find(channel => channel.id === Database[3]).send(logEmbed)
                                    }
                                }
                                else if(Database[2] === "disabled") {}
                            }).catch(() => {
                                errorEmbed.addField(Text.unable_to_kick_the_user, "\u200B", false),
                                message.channel.send(errorEmbed)
                            })
                        }).catch(() => {
                            errorEmbed.addField(Text.unable_to_kick_the_user, Text.because_bot_cant_send_a_message, false),
                            message.channel.send(errorEmbed)
                        })
                    }
                    else {
                        message.channel.send(`${Text.kicking_canceled}<@${kickMember.id}>!`)
                    }
                })
                .catch(() => {
                    confirmationMessage.delete(),
                    message.delete()
                })
        })
    }
}