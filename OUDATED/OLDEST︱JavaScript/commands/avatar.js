const {RichEmbed} = require("discord.js")

module.exports = (MetalKirikot, Database, Config, Text, message, args) => {

    let avatarMember = message.mentions.members.first()
    let avatarEmbed = new RichEmbed()
        .setColor(Config.yellow)

    if(!avatarMember) {
        if(!args[0]) {
            return avatarEmbed.setImage(message.author.displayAvatarURL),
            message.channel.send(avatarEmbed)
        } else {
            avatarMember = message.guild.members.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
            if(!avatarMember) {
                avatarEmbed.setImage(message.author.displayAvatarURL)
                message.channel.send(avatarEmbed)
            } else {
                return avatarEmbed.setImage(avatarMember.user.displayAvatarURL),
                message.channel.send(avatarEmbed)
            }
        }
    } else {
        return avatarEmbed.setImage(avatarMember.user.displayAvatarURL),
        message.channel.send(avatarEmbed)
    }
}