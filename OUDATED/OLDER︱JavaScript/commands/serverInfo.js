module.exports = {
    name: "Server Info",
    description: "Shows info about current server/any server with me!",
    module: "guildInfo",
    category: "Info",
    usage: ["serverinfo", "server", "si", "guildinfo", "guild", "gi"],
    cooldown: 15,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed, Guild} = require("discord.js")
        let guild = new Guild()
        if(!args.join(" "))
        {
            if(!message.guild) return F.embed(TXT.i_cant_understand_which_guild[0], TXT.i_cant_understand_which_guild[1])
            else guild = message.guild
        }
        else 
        {
            guild = Client.guilds.find(guild => guild.name.toLowerCase() == args.join(" ").trim().toLowerCase() || guild.id == args)
            if(!guild) return F.embed(TXT.im_not_on_this_guild[0], TXT.im_not_on_this_guild[1])
        }
        let region = new String()
        let online = 0
        let afkChannel = guild.afkChannel
        let afkTimeout = guild.afkTimeout
        let systemChannel = `<#${guild.systemChannelID}>`
        let messageNotifications = guild.defaultMessageNotifications
        let channelsCount = 0, channels = new String()
        let rolesCount = 0, roles = new String()
        let emojisCount = 0, emojis = new String()

        console.log(F.formateDate(guild.createdAt, TXT))

        let regions = ["brazil", "europe", "hong-kong", "india", "japan", "russia", "singapore", "south-africa", "sydney", "us-central", "us-east", "us-south", "us-west"]
        regions.forEach((reg, index) => {
            if(guild.region == reg) region = TXT.regions[index]
        })
        guild.presences.forEach(presence => {
            if(presence.status != "offline") online++
        })
        if(!afkChannel)
        {
            afkChannel = TXT.none
            afkTimeout = TXT.none
        }
        if(systemChannel == "<#null>") systemChannel = TXT.system_messages

        if(guild != message.guild)
        {
            if(afkChannel != TXT.none) afkChannel = `#${guild.systemChannel.name}`
            if(systemChannel != TXT.system_messages) systemChannel = `#${guild.systemChannel.name}`
        }
        if(messageNotifications == "ALL") messageNotifications = TXT.messageNotifications[0]
        else messageNotifications = TXT.messageNotifications[1]
        guild.channels.sort(F.sort1).forEach(channel => {
            if(channel.type != "category")
            {
                channelsCount++
                if(guild == message.guild && channel.type != "voice") channels += channel + "\n"
                else channels += `#${channel.name}\n`
            }
        })
        guild.roles.sort(F.sort2).forEach(role => {
            rolesCount++
            if(guild == message.guild || role.name == "@everyone") roles += role + "\n"
            else roles += `@${role.name}\n`
        })
        guild.emojis.sort(F.sort3).forEach(emoji => {
            emojisCount++
            emojis += `<:${emoji.name}:${emoji.id}>`
        })

        let guildEmbed = new RichEmbed()
            //.setTitle(TXT.serverSettings[0].replace("%guild", guild.name))/*.setColor(Config.blue)*//*.setImage(guild.iconURL)/*//**.setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL)*/
            .addField(TXT.serverSettings[1], `***${guild.nameAcronym}***`).addField(TXT.serverSettings[2], `***${region}***`).addField(TXT.serverSettings[3], `***${guild.id}***`).addField(TXT.serverSettings[4], `***${F.boolean(guild.verified, TXT)}***`)
            .addField(TXT.serverSettings[5], `**<@${guild.ownerID}>**`).addField(TXT.serverSettings[6], `***${F.formateDate(guild.createdAt, TXT)}***`).addField(TXT.serverSettings[7], TXT.verification[guild.verificationLevel]).addField(TXT.serverSettings[10], afkChannel).addField(TXT.serverSettings[11], afkTimeout)
            .addField(TXT.serverSettings[12], systemChannel).addField(TXT.serverSettings[13], messageNotifications).addField(TXT.serverSettings[14], TXT.MFA_level[guild.mfaLevel]).addField(TXT.serverSettings[15], TXT.content_filter[guild.explicitContentFilter]).addField(TXT.serverSettings[8], `***${guild.memberCount}***`)
            //.addField(TXT.serverSettings[9], `***${online}***`).addField(TXT.serverSettings[16] + channelsCount, `**${channels}**`).addField(TXT.serverSettings[18] + emojisCount, emojis).addField(TXT.serverSettings[17] + rolesCount, roles)

        message.channel.send(guildEmbed)
        this.success = true
    }
}