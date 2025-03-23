module.exports = {
    name: "Tempban",
    description: "Temporarity bans member from the server!",
    module: "tempBan",
    category: "Moderation",
    usage: ["tempban", "tb"],
    cooldown: 30,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const MS = require("ms")
        const {RichEmbed} = require("discord.js")
        const FS = require("fs")
        let banDuration = args[1]
        let suppliedReason = args.slice(2).join(" ")
        let errorEmbed = new RichEmbed().setTitle(TXT.error).setColor(Config.red).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL)
        if(!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[2])
        if(!message.guild.me.hasPermission("BAN_MEMBERS") || !message.guild.me.hasPermission("ADMINISTRATOR")) return F.embed(TXT.bot_have_not_enough_permissions[0], TXT.bot_have_not_enough_permissions[2])
        let banMember = F.findMember(true, 1)
        if(!banMember) return
        if(banMember == message.member) return F.embed(TXT.cant_do_it_for_yourself[1], TXT.try_using_help.replace("%prefix", Data.prefix))
        if(banMember == message.guild.me) return F.embed(TXT.bot_cant_do_it_for_himself[1], "\u200B")
        if(banMember.highestRole.position > message.member.highestRole.position) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[1])
        if(banMember == message.guild.owner) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[2])
        if(banMember.hasPermission("ADMINISTRATOR")) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[3])
        if(banMember.user.tag === Config.owner) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[4])
        if(!banDuration) return F.embed(TXT.didnt_input_ban_time[0], TXT.didnt_input_ban_time[1])
        if(MS(banDuration) == undefined) return F.embed(TXT.ban_time_wasnt_valid, TXT.try_using_help.replace("%prefix", Data.prefix))
        if(MS(banDuration) > 2147483647) return F.embed(TXT.too_long_timeout[0], TXT.too_long_timeout[1])
        if(!suppliedReason) return F.embed(TXT.didnt_give_the_reason_to_ban[0], TXT.didnt_give_the_reason_to_ban[1])
        let user = banMember.user
        let bannedAt = F.formateDate(new Date, TXT)
        let joinedAt = F.formateDate(banMember.joinedAt, TXT)
        let successEmbed = new RichEmbed().setColor(Config.green).setTitle(TXT.success[0]).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL)
        .setDescription(TXT.success[3].replace("%member", banMember.user.tag).replace("%time", args[1]))
        let logEmbed = new RichEmbed().setColor(Config.orange).setImage(banMember.user.displayAvatarURL).setAuthor(TXT.event[0], message.guild.iconURL).setTitle(TXT.event[2].replace("%author", message.author.tag).replace("%member", banMember.user.tag))
        .setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).addField(TXT.bannedParams[0], `***${banMember.user.id}***`).addField(TXT.bannedParams[1], `***${joinedAt}***`).addField(TXT.bannedParams[2], `***${bannedAt}***`).addField(TXT.bannedParams[4], `***${F.secondsToHMS(MS(banDuration) / 1000)}***`).addField(TXT.bannedParams[3], `***${suppliedReason}***`)
        let toWrite = [F.replaceAll(banMember.user.tag, " ", "_"), banMember.id, F.replaceAll(message.author.tag, " ", "_"), F.replaceAll(joinedAt, " ", "_"), F.replaceAll(bannedAt, " ", "_"), MS(banDuration)].join(" ")
        let privateMessage = Data.privateTempBan.join(" ").replace("{GUILD}", message.guild.name).replace("{REASON}", suppliedReason).replace("${DURATION}", F.secondsToHMS(MS(banDuration) / 1000))
        let confirmationEmbed = new RichEmbed().setTitle(TXT.are_you_sure).setColor(Config.orange).addField(TXT.react_to_this_message[1], TXT.this_will_expire_in.replace("%time", 5))

        F.confirmAction(confirmationEmbed, 5000, () => {
            try {
                banMember.send(privateMessage)
            } catch {
                message.guild.owner.send(TXT.couldnt_send_message[2].replace("%member", banMember.user.tag))
            }
            if(message.member != message.guild.owner) message.guild.owner.send(TXT.owner_message[0].replace("%author", message.author.tag).replace("%member", banMember.user.tag).replace("%reason", suppliedReason)).replace("%duration", F.secondsToHMS(MS(banDuration) / 1000))
            banMember.ban({
                reason: suppliedReason
            }).then(() => {
                message.channel.send(successEmbed)
                F.log(Data, logEmbed)

                F.writeFile(`tempbans/${message.guild.id}`, toWrite)
                this.success = true

                setTimeout(() => {
                        message.guild.unban(user.id).then(() => {
                            message.guild.owner.send(TXT.user_were_unbanned.replace("%member", user.tag))
                            FS.writeFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, FS.readFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, 'utf8').replace(toWrite, "").trim(), 'utf8')
                        }).catch(() => {
                            FS.writeFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, FS.readFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, 'utf8').replace(toWrite, "").trim(), 'utf8')
                        })
                }, MS(banDuration))
            }).catch(() => {
                errorEmbed.addField(TXT.unable_to[1].replace("%member", banMember.user.tag), "\u200B", false),
                message.channel.send(errorEmbed)
            })
        }, () => {
            message.channel.send(TXT.canceled[1].replace("%id", banMember.id))
        })
    }
}