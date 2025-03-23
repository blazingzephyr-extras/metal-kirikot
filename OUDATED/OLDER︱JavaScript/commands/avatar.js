module.exports = {
    name: "Avatar",
    description: "Shows avatar of selected user!",
    module: "avatar",
    category: "Others",
    usage: ["avatar", "a"],
    cooldown: 10,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js")
        if(message.guild)
        {
            let avatarMember = F.findMember(false)
            if(!avatarMember) avatarMember = message.member
    
            let embed = new RichEmbed()
                 .setColor(Config.orange)
                 .setImage(avatarMember.user.displayAvatarURL)
    
            message.channel.send(embed)
            this.success = true
        }
        else
        {
            let avatarUser = message.mentions.users.first() || message.author
            let embed = new RichEmbed()
                 .setColor(Config.orange)
                 .setImage(avatarUser.displayAvatarURL)
    
            message.channel.send(embed)
            this.success = true
        }
    }
}