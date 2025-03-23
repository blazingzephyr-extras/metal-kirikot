module.exports = {
    name: "Unaban",
    description: "Unbans member in the server!",
    module: "unban",
    category: "Moderation",
    usage: ["unban", "ub"],
    cooldown: 30,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const FS = require("fs")
        const {RichEmbed} = require("discord.js")
        let ID = args[0]
        let suppliedReason = args.slice(1).join(" ")
        if(!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[2])
        if(!message.guild.me.hasPermission("BAN_MEMBERS") || !message.guild.me.hasPermission("ADMINISTRATOR")) return F.embed(TXT.bot_have_not_enough_permissions[0], TXT.bot_have_not_enough_permissions[2])
        if(!ID) return F.embed(TXT.didnt_give_the_id_for_unbanning[0], TXT.didnt_give_the_id_for_unbanning[1])
        if(!suppliedReason) return F.embed(TXT.didnt_give_the_reason_to_unban[0], TXT.didnt_give_the_reason_to_unban[1])

        let confirmationEmbed = new RichEmbed().setTitle(TXT.are_you_sure).setColor(Config.orange).addField(TXT.react_to_this_message[3], TXT.this_will_expire_in.replace("%time", 5))
        F.confirmAction(confirmationEmbed, 5, () => {

            message.guild.unban(ID, suppliedReason).then(user => {
    
                let toWrite = new String()
                let data = [].concat(FS.readFileSync(`F:/Metal Kirikot/data/bans/${message.guild.id}`, 'utf8').split("\n"), FS.readFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, 'utf8').split("\n"))
                data.forEach((element, i) => {
                    if(element == "") data.splice(i, 1)
                })
                data.forEach((bannedMember) => {
                    if(bannedMember.indexOf(user)) toWrite = bannedMember
                })

                let successEmbed = new RichEmbed().setColor(Config.green).setTitle(TXT.success[0]).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL).setDescription(TXT.success[6].replace("%tag", user.tag))
                let logEmbed = new RichEmbed().setColor(Config.orange).setImage(message.author.displayAvatarURL).setAuthor(TXT.event[0], message.guild.iconURL).setTitle(TXT.event[4].replace("%author", message.author.tag))

                let folders = ["bans", "tempbans"]
                folders.forEach(folder => {
                    FS.writeFileSync(`F:/Metal Kirikot/data/${folder}/${message.guild.id}`, FS.readFileSync(`F:/Metal Kirikot/data/${folder}/${message.guild.id}`, 'utf8').replace(toWrite, "").trim(), 'utf8')
                })

                message.channel.send(successEmbed)
                F.log(Data, logEmbed)
                this.success = true
                
            }).catch(() => {
                F.embed(TXT.didnt_input_valid_id[0], TXT.didnt_input_valid_id[1].replace("%prefix", Data.prefix))
            })
        }, () => {
            message.channel.send(TXT.canceled[3].replace("%id", kickMember.id))
        })
    }
}