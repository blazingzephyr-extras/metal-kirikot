module.exports = {
    name: "Mute",
    description: "Mutes member in the server!",
    module: "mute",
    category: "Moderation",
    usage: ["mute", "m"],
    cooldown: 15,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js")
        let suppliedReason = args.slice(1).join(" ")
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[3])
        if(!message.guild.me.hasPermission("MANAGE_ROLES") || !message.guild.me.hasPermission("ADMINISTRATOR")) return F.embed(TXT.bot_have_not_enough_permissions[0], TXT.bot_have_not_enough_permissions[3])
        let muteMember = F.findMember(true, 2)
        if(!muteMember) return
        if(muteMember == message.member) return F.embed(TXT.cant_do_it_for_yourself[2], TXT.try_using_help.replace("%prefix", Data.prefix))
        if(muteMember == message.guild.me) return F.embed(TXT.bot_cant_do_it_for_himself[2], "\u200B")
        if(muteMember.highestRole.position > message.member.highestRole.position) return F.embed(TXT.cant_mute_that_user[0].replace("%member", muteMember.user.tag), TXT.cant_mute_that_user[1])
        if(muteMember == message.guild.owner) return F.embed(TXT.cant_mute_that_user[0].replace("%member", muteMember.user.tag), TXT.cant_mute_that_user[2])
        if(muteMember.hasPermission("ADMINISTRATOR")) return F.embed(TXT.cant_mute_that_user[0].replace("%member", muteMember.user.tag), TXT.cant_mute_that_user[3])
        if(muteMember.user.tag === Config.owner) return F.embed(TXT.cant_mute_that_user[0].replace("%member", muteMember.user.tag), TXT.cant_mute_that_user[4])
        if(!suppliedReason) return F.embed(TXT.didnt_give_the_reason_to_mute[0], TXT.didnt_give_the_reason_to_mute[1])
        let mutedAt = F.formateDate(new Date, TXT)
        let joinedAt = F.formateDate(muteMember.joinedAt, TXT)
        let successEmbed = new RichEmbed().setColor(Config.green).setTitle(TXT.success[0]).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL)
        .setDescription(TXT.success[4].replace("%member", muteMember.user.tag))
        let logEmbed = new RichEmbed().setColor(Config.orange).setImage(muteMember.user.displayAvatarURL).setAuthor(TXT.event[0], message.guild.iconURL).setTitle(TXT.event[3].replace("%author", message.author.tag).replace("%member", muteMember.user.tag))
        .setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).addField(TXT.mutedParams[0], `***${muteMember.user.id}***`).addField(TXT.mutedParams[1], `***${joinedAt}***`).addField(TXT.mutedParams[2], `***${mutedAt}***`).addField(TXT.mutedParams[3], `***${suppliedReason}***`)
        let toWrite = [F.replaceAll(muteMember.user.tag, " ", "_"), muteMember.id, F.replaceAll(message.author.tag, " ", "_"), F.replaceAll(joinedAt, " ", "_"), F.replaceAll(mutedAt, " ", "_")].join(" ")
        let privateMessage = Data.privateMute.join(" ").replace("{GUILD}", message.guild.name).replace("{REASON}", suppliedReason)
        let confirmationEmbed = new RichEmbed().setTitle(TXT.are_you_sure).setColor(Config.orange).addField(TXT.react_to_this_message[2], TXT.this_will_expire_in.replace("%time", 5))
        F.confirmAction(confirmationEmbed, 5000, () => {
            try {
                muteMember.send(privateMessage) 
            } catch {
                message.guild.owner.send(TXT.couldnt_send_message[3].replace("%member", muteMember.user.tag))
            }
            if(message.member != message.guild.owner) message.guild.owner.send(TXT.owner_message[1].replace("%author", message.author.tag).replace("%member", banMember.user.tag).replace("%reason", suppliedReason))
            message.guild.channels.forEach(channel => {
                channel.overwritePermissions(muteMember, {
                    ADD_REACTIONS: false,
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    SPEAK: false,
                    CHANGE_NICKNAME: false
                })
            })
            muteMember.setNickname(`${muteMember.user.username} [MUTED]`, TXT.userMuted)
            message.channel.send(successEmbed)
            F.log(Data, logEmbed)
            F.writeFile(`mutes/${message.guild.id}`, toWrite)
            this.success = true
        }, () => message.channel.send(TXT.canceled[2].replace("%id", muteMember.id)))
    }
}