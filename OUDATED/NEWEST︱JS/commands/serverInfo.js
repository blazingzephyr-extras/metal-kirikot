module.exports = {
    name: "Server Info",
    description: "Shows information about server where message was from!",
    group: "Others",
    timeout: 20000,
    guildOnly: false,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const {RichEmbed} = require("discord.js")
        let errorEmbed = new RichEmbed()
            .setColor(Config.red)
            .setTitle(Text.error)

        let guild

        if(!args.join(" "))
        {
            if(!message.guild)
            {
                return errorEmbed.addField(Text.i_cant_understand_which_guild, Text.set_guilds_name, false),
                message.channel.send(errorEmbed)
            } 
            else 
            {
                guild = message.guild
            }        
        }
        else 
        {
            guild = MetalKirikot.guilds.find(guild => guild.name.toLowerCase() == args.join(" ").trim().toLowerCase())
            if(!guild)
            {
                return errorEmbed.addField(Text.im_not_on_this_guild, Text.typing_error, false),
                message.channel.send(errorEmbed)
            }
        }

        let title = `🖥️**${guild.name}**${Text.info_about}`
        let nameAcronym = guild.nameAcronym
        let region = new String()
        let id = guild.id
        let verified = guild.verified.toString().charAt(0).toUpperCase() + guild.verified.toString().slice(1)
        let owner = `<@${guild.ownerID}>`
        let createdAt = Functions[0](guild.createdAt, Text)
        let verificationLevel = Text.verification_level[guild.verificationLevel + 1]
        let memberCount = guild.memberCount
        let online = 0
        let afkChannel = guild.afkChannel
        let afkTimeout = guild.afkTimeout
        let systemChannel = `<#${guild.systemChannelID}>`
        let messageNotifications = guild.defaultMessageNotifications
        let MFALevel = Text.MFA_level[guild.mfaLevel + 1]
        let explicitContentFilter = Text.content_filter[guild.explicitContentFilter + 1]
        let channelsCount = 0, channels = new String()
        let rolesCount = 0, roles = new String()
        let emojisCount = 0, emojis = new String()

        let counter = 0
        let regions = ["brazil", "europe", "hong-kong", "india", "japan", "russia", "singapore", "south-africa", "sydney", "us-central", "us-east", "us-south", "us-west"]

        regions.forEach(reg => {
            counter++
            if(guild.region == reg) {
                region = Text.region[counter]
            }
        })

        message.guild.presences.forEach(presence => {
            if(presence.status != "offline") {
                online++
            }
        })
        if(!afkChannel)
        {
            afkChannel = Text.none
            afkTimeout = Text.none
        }
        if(systemChannel == "<#null>")
        {
            systemChannel = Text.no_system_messages
        }

        if(messageNotifications == "ALL")
        {
            messageNotifications = Text.all_messages
        }
        else {
            messageNotifications = Text.only_notifications
        }

        guild.channels.sort(Functions[1]).forEach(channel => {
            if(channel.type != "category")
            {
                channelsCount++
                channels += channel + "\n"
            }
        })

        guild.roles.sort(Functions[2]).forEach(role => {

            rolesCount++
            if(message.guild != guild && role != "@everyone")
            {
                roles += `@${role.name}\n`
            } 
            else {
                roles += role + "\n"
            }
        })

        guild.emojis.sort(Functions[3]).forEach(emoji => {
            emojisCount++
            emojis += `<:${emoji.name}:${emoji.id}>`
        })
        
        let guildEmbed = new RichEmbed()
            .setTitle(title)
            .setColor(Config.blue)
            .setImage(guild.iconURL)
            .addField(Text.nameAcronym, nameAcronym, false)
            .addField(Text.region[0], region, false)
            .addField(Text.guild_id, id, false)
            .addField(Text.verified, verified, false)
            .addField(Text.owner, owner, false)
            .addField(Text.createdAt, createdAt, false)
            .addField(Text.verification_level[0], verificationLevel, false)
            .addField(Text.total_members, memberCount, false)
            .addField(Text.online, online, false)
            .addField(Text.afkChannel, afkChannel, false)
            .addField(Text.afkTimeout, afkTimeout, false)
            .addField(Text.systemChannel, systemChannel, false)
            .addField(Text.message_notifications, messageNotifications, false)
            .addField(Text.MFA_level[0], MFALevel, false)
            .addField(Text.content_filter[0], explicitContentFilter, false)
            .addField(Text.channels + channelsCount, channels, false)
            .addField(Text.roles + rolesCount, roles, false)
            .addField(Text.emojis + emojisCount, emojis, false)

        message.channel.send(guildEmbed)
    }
}