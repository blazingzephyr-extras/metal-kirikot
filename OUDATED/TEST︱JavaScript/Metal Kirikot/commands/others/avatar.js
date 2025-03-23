const Bot = require("F:/Metal Kirikot/bot")
const Discord = require("discord.js")
const RichEmbed = Discord.RichEmbed

Bot.on("message", async  message  => {
    if(!message.content.startsWith("metal!avatar")) return
    if(message.author.bot || message.channel.type === "dm") return
        let avatarUser = message.mentions.users.first()
        let avatarLink;
    
        let Embed = new RichEmbed()
            .setColor([255, 150, 0])
    
    
        if(!avatarUser) return avatarLink = message.author.displayAvatarURL,
        Embed.setImage(avatarLink),
        message.channel.send(Embed)
    
    
        else return avatarLink = avatarUser.displayAvatarURL,
        Embed.setImage(avatarLink),
        message.channel.send(Embed)
})
