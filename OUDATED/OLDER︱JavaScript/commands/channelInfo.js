module.exports = {
    name: "Channel Info",
    description: "Shows info about any channel of this guild!",
    module: "channelInfo",
    category: "Info",
    usage: ["channelinfo", "channel", "chnl", "ci"],
    cooldown: 10,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed, Channel} = require("discord.js")  
        let channel = new Channel()
        let ChannelEmbed = new RichEmbed()
            .setColor(Config.violet)

        if(!message.guild || !args.join(" ")) channel = message.channel
        else 
        {
            channel = message.mentions.channels.first() || message.guild.channels.find(channel => channel.name.toLowerCase() == args.join(" ").toLowerCase() || channel.id == args[0])
            if(!channel) return F.embed(TXT.no_channel[0], TXT.no_channel[1])
        }

       switch(channel.type)
       {
           case 'text':
            {
                ChannelEmbed.setTitle(TXT.channelSettings[0].replace("%channel", channel.name)).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL).setImage(channel.guild.iconURL)
                channel.fetchPinnedMessages().then(messages => {
                    let parent = TXT.none
                    if(channel.parent) parent = channel.parent.name
                    let topic = TXT.none
                    if(channel.topic) topic = channel.topic
                    let lastPinDate = TXT.none_pins
                    if(channel.lastPinAt) lastPinDate = F.formateDate(channel.lastPinAt, TXT)
                    let rateLimitPerUser = new String()
                    if(channel.rateLimitPerUser == 0) rateLimitPerUser = TXT.time[7]
                    if(channel.rateLimitPerUser > 0 && channel.rateLimitPerUser < 60) rateLimitPerUser = TXT.time[2].replace("%time", channel.rateLimitPerUser)
                    if(channel.rateLimitPerUser == 60) rateLimitPerUser = TXT.time[3]
                    if(channel.rateLimitPerUser > 60 && channel.rateLimitPerUser < 360) rateLimitPerUser = TXT.time[4].replace("%time", channel.rateLimitPerUser / 60)
                    if(channel.rateLimitPerUser == 360) rateLimitPerUser = TXT.time[5]
                    if(channel.rateLimitPerUser > 360) rateLimitPerUser = TXT.time[6].replace("%time", channel.rateLimitPerUser / 360)
                    ChannelEmbed.addField(TXT.channelSettings[2], `***${channel.id}***`).addField(TXT.channelSettings[3], `***${TXT.channels[0]}***`).addField(TXT.channelSettings[4], `***${F.formateDate(channel.createdAt, TXT)}***`).addField(TXT.channelSettings[5], `***${parent}***`)
                    .addField(TXT.channelSettings[7], `***${topic}***`).addField(TXT.channelSettings[8], `***${rateLimitPerUser}***`).addField(TXT.channelSettings[9], `***${F.boolean(channel.nswf, TXT)}***`).addField(TXT.channelSettings[10], `***${channel.members.size}***`)
                    .addField(TXT.channelSettings[11], `***${messages.size}***`).addField(TXT.channelSettings[12], `***${lastPinDate}***`).addField(TXT.channelSettings[13], `***${F.boolean(channel.manageable, TXT)}***`)
                    message.channel.send(ChannelEmbed)
                    this.success = true
                })
                break
            }
            case 'voice':
            {
                ChannelEmbed.setTitle(TXT.channelSettings[0].replace("%channel", channel.name)).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL).setImage(channel.guild.iconURL)
                let parent = TXT.none
                if(channel.parent) parent = channel.parent.name
                let userLimit = TXT.unlimited
                if(channel.userLimit != 0) userLimit = channel.userLimit
                ChannelEmbed.addField(TXT.channelSettings[2], `***${channel.id}***`).addField(TXT.channelSettings[3], `***${TXT.channels[1]}***`)
                .addField(TXT.channelSettings[4], `***${F.formateDate(channel.createdAt, TXT)}***`).addField(TXT.channelSettings[5], `***${parent}***`).addField(TXT.channelSettings[14], `***${channel.bitrate + "kbps"}***`).addField(TXT.channelSettings[15], `***${userLimit}***`)
                .addField(TXT.channelSettings[16], `***${F.boolean(channel.full, TXT)}***`).addField(TXT.channelSettings[17], `***${F.boolean(channel.joinable, TXT)}***`).addField(TXT.channelSettings[18], `***${F.boolean(channel.speakable, TXT)}***`).addField(TXT.channelSettings[13], `***${F.boolean(channel.manageable, TXT)}***`)
                message.channel.send(ChannelEmbed)
                this.success = true
                break
            }
            case 'category':
            {
                let children = TXT.none, childrenCount = 0
                if(channel.children)
                {
                    childrenCount = channel.children.size
                    children = ""
                    channel.children.forEach(channel => {
                        if(channel.type == 'text') children += `${channel}\n`
                        else children += `***${channel}***\n`
                    })
                }
                ChannelEmbed.setTitle(TXT.channelSettings[0].replace("%channel", channel.name)).setFooter(`${message.guild.name} | ${message.guild.me.user.tag}` , message.guild.me.user.displayAvatarURL).setImage(channel.guild.iconURL)
                .addField(TXT.channelSettings[2], `***${channel.id}***`).addField(TXT.channelSettings[3], `***${TXT.channels[0]}***`).addField(TXT.channelSettings[20] + childrenCount, children).addField(TXT.channelSettings[4], `***${F.formateDate(channel.createdAt, TXT)}***`).addField(TXT.channelSettings[13], `***${F.boolean(channel.manageable, TXT)}***`)
                message.channel.send(ChannelEmbed)
                this.success = true
                break
            }
            case 'dm':
            {
                let lastPinDate = TXT.none_pins
                if(channel.lastPinAt) lastPinDate = F.formateDate(channel.lastPinAt, TXT)
                channel.fetchPinnedMessages().then(messages => {

                    ChannelEmbed.setTitle(TXT.channelSettings[1]).setFooter(`${Client.user.tag}`, Client.user.displayAvatarURL).setImage(message.author.displayAvatarURL)
                    .addField(TXT.channelSettings[2], `***${channel.id}***`).addField(TXT.channelSettings[3], `***${TXT.channels[3]}***`).addField(TXT.channelSettings[19], `***${channel.recipient.tag}***`).addField(TXT.channelSettings[4], `***${F.formateDate(channel.createdAt, TXT)}***`).addField(TXT.channelSettings[11], `***${messages.size}***`).addField(TXT.channelSettings[12], `***${lastPinDate}***`)
                    message.channel.send(ChannelEmbed)
                    this.success = true
                })
                break
            }
       }
    }
}