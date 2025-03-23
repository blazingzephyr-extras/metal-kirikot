module.exports = {
    name: "Kick",
    description: "Kicks member from the server!",
    module: "kick",
    category: "Moderation",
    usage: ["kick", "k"],
    cooldown: 15,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js")
        let suppliedReason = args.slice(1).join(" ")
        let errorEmbed = new RichEmbed()
            .setTitle(TXT.error)
            .setColor(Config.red)
            .setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL)
        if(!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[1])
        if(!message.guild.me.hasPermission("KICK_MEMBERS") || !message.guild.me.hasPermission("ADMINISTRATOR")) return F.embed(TXT.bot_have_not_enough_permissions[0], TXT.bot_have_not_enough_permissions[1])
        let kickMember = F.findMember(true, 0)
        if(!kickMember) return
        if(kickMember == message.member) return F.embed(TXT.cant_do_it_for_yourself[0], TXT.try_using_help.replace("%prefix", Data.prefix))
        if(kickMember == message.guild.me) return F.embed(TXT.bot_cant_do_it_for_himself[0], "\u200B")
        if(kickMember.highestRole.position > message.member.highestRole.position) return F.embed(TXT.cant_kick_that_user[0].replace("%member", kickMember.user.tag), TXT.cant_kick_that_user[1])
        if(kickMember == message.guild.owner) return F.embed(TXT.cant_kick_that_user[0].replace("%member", kickMember.user.tag), TXT.cant_kick_that_user[2])
        if(kickMember.hasPermission("ADMINISTRATOR")) return F.embed(TXT.cant_kick_that_user[0].replace("%member", kickMember.user.tag), TXT.cant_kick_that_user[3])
        if(kickMember.user.tag === Config.owner) return F.embed(TXT.cant_kick_that_user[0].replace("%member", kickMember.user.tag), TXT.cant_kick_that_user[4])
        if(!suppliedReason) return F.embed(TXT.didnt_give_the_reason_to_kick[0], TXT.didnt_give_the_reason_to_kick[1])
        let kickedAt = F.formateDate(new Date, TXT)
        let joinedAt = F.formateDate(kickMember.joinedAt, TXT)
        let successEmbed = new RichEmbed().setColor(Config.green).setTitle(TXT.success[0]).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).setDescription(TXT.success[1].replace("%member", kickMember.user.tag))
        let logEmbed = new RichEmbed().setColor(Config.orange).setImage(kickMember.user.displayAvatarURL).setAuthor(TXT.event[0], message.guild.iconURL).setTitle(TXT.event[1].replace("%author", message.author.tag).replace("%member", kickMember.user.tag)).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).addField(TXT.kickedParams[0], `***${kickMember.user.id}***`).addField(TXT.kickedParams[1], `***${joinedAt}***`).addField(TXT.kickedParams[2], `***${kickedAt}***`).addField(TXT.kickedParams[3], `***${suppliedReason}***`)
        let privateMessage = Data.privateKick.join(" ").replace("{GUILD}", message.guild.name).replace("{REASON}", suppliedReason)
        let confirmationEmbed = new RichEmbed().setTitle(TXT.are_you_sure).setColor(Config.orange).addField(TXT.react_to_this_message[0], TXT.this_will_expire_in.replace("%time", 5))

        F.confirmAction(confirmationEmbed, 5000, () => {
            try {
                kickMember.user.send(privateMessage)
            } catch {
                message.guild.owner.send(TXT.couldnt_send_message[0].replace("%member", kickMember.user.tag))
            }
            if(message.member != message.guild.owner) message.guild.owner.send(TXT.owner_message[0].replace("%author", message.author.tag).replace("%member", kickMember.user.tag).replace("%reason", suppliedReason))
            
            kickMember.kick(suppliedReason).then(() => {
                message.channel.send(successEmbed)
                F.log(Data, logEmbed)
                this.success = true
            }).catch(() => {
                errorEmbed.addField(TXT.unable_to[0].replace("%member", kickMember.user.tag), "\u200B", false),
                message.channel.send(errorEmbed)
            })
        }, () => {
            message.channel.send(TXT.canceled[0].replace("%id", kickMember.id))
        })
    }
}