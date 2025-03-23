module.exports = {
    name: "Ban",
    description: "Bans member from the server!",
    module: "ban",
    category: "Moderation",
    usage: ["ban", "b"],
    cooldown: 30,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js")
        let suppliedReason = args.slice(1).join(" ")
        let errorEmbed = new RichEmbed().setTitle(TXT.error).setColor(Config.red).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL)
        if(!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[2])
        if(!message.guild.me.hasPermission("BAN_MEMBERS") || !message.guild.me.hasPermission("ADMINISTRATOR")) return F.embed(TXT.bot_have_not_enough_permissions[0], TXT.bot_have_not_enough_permissions[2])
        let banMember = F.findMember(true, 2)
        if(!banMember) return
        if(banMember == message.member) return F.embed(TXT.cant_do_it_for_yourself[1], TXT.try_using_help.replace("%prefix", Data.prefix))
        if(banMember == message.guild.me) return F.embed(TXT.bot_cant_do_it_for_himself[1], "\u200B")
        if(banMember.highestRole.position > message.member.highestRole.position) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[1])
        if(banMember == message.guild.owner) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[2])
        if(banMember.hasPermission("ADMINISTRATOR")) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[3])
        if(banMember.user.tag === Config.owner) return F.embed(TXT.cant_ban_that_user[0].replace("%member", banMember.user.tag), TXT.cant_ban_that_user[4])
        if(!suppliedReason) return F.embed(TXT.didnt_give_the_reason_to_ban[0], TXT.didnt_give_the_reason_to_ban[1])
        let bannedAt = F.formateDate(new Date, TXT)
        let joinedAt = F.formateDate(banMember.joinedAt, TXT)
        let successEmbed = new RichEmbed().setColor(Config.green).setTitle(TXT.success[0]).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL)
        .setDescription(TXT.success[2].replace("%member", banMember.user.tag))
        let logEmbed = new RichEmbed().setColor(Config.orange).setImage(banMember.user.displayAvatarURL).setAuthor(TXT.event[0], message.guild.iconURL).setTitle(TXT.event[2].replace("%author", message.author.tag).replace("%member", banMember.user.tag))
        .setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).addField(TXT.bannedParams[0], `***${banMember.user.id}***`).addField(TXT.bannedParams[1], `***${joinedAt}***`).addField(TXT.bannedParams[2], `***${bannedAt}***`).addField(TXT.bannedParams[3], `***${suppliedReason}***`)
        let toWrite = [F.replaceAll(banMember.user.tag, " ", "_"), banMember.id, F.replaceAll(message.author.tag, " ", "_"), F.replaceAll(joinedAt, " ", "_"), F.replaceAll(bannedAt, " ", "_")].join(" ")
        let privateMessage = Data.privateBan.join(" ").replace("{GUILD}", message.guild.name).replace("{REASON}", suppliedReason)
        let confirmationEmbed = new RichEmbed().setTitle(TXT.are_you_sure).setColor(Config.orange).addField(TXT.react_to_this_message[1], TXT.this_will_expire_in.replace("%time", 5))

        F.confirmAction(confirmationEmbed, 5000, () => {
            try {
                banMember.send(privateMessage)  
            } catch {
                message.guild.owner.send(TXT.couldnt_send_message[1].replace("%member", banMember.user.tag))
            }
            if(message.member != message.guild.owner) message.guild.owner.send(TXT.owner_message[1].replace("%author", message.author.tag).replace("%member", banMember.user.tag).replace("%reason", suppliedReason))

            banMember.ban({
              reason: suppliedReason
            }).then(() => {
                message.channel.send(successEmbed)
                F.log(Data, logEmbed)

                F.writeFile(`bans/${message.guild.id}`, toWrite)
                this.success = true
            }).catch(() => {
                errorEmbed.addField(TXT.unable_to[1].replace("%member", banMember.user.tag), "\u200B", false),
                message.channel.send(errorEmbed)
            })
        }, () => {
            message.channel.send(TXT.canceled[1].replace("%id", banMember.id))
      })
    }
}