module.exports = {
    name: "Avatar",
    description: "Shows avatar of mentionted user!",
    group: "Others",
    timeout: 20000,
    guildOnly: false,
    
    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const {RichEmbed} = require("discord.js")

        String.prototype.replaceAll = function (string1, string2, ignore) {
            return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
        }

        let avatarUser = message.mentions.users.first()
        let avatarMember

        let avatarEmbed = new RichEmbed()
            .setColor(Config.yellow)

        if(!message.guild)
        {
            if(!avatarUser)
            {
                avatarUser = message.author
            }

            avatarEmbed.setImage(avatarUser.displayAvatarURL)
            message.channel.send(avatarEmbed)
        } 
        else
        {
            if(!avatarUser)
            {
                if(!args[0])
                {
                    avatarUser = message.author
                }
                else 
                {
                    avatarMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase().replaceAll("_", " "))
                    if(!avatarMember)
                    {
                        avatarMember = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
                        if(!avatarMember)
                        {
                            avatarMember = message.guild.members.find(member => member.id == args[0])
                            if(!avatarMember)
                            {
                                avatarUser = message.author
                            }
                        }
                    }
                }
            }

            if(!avatarUser)
            {
                avatarUser = avatarMember.user
            }

            avatarEmbed.setImage(avatarUser.displayAvatarURL)
            message.channel.send(avatarEmbed)
        }
    }
}