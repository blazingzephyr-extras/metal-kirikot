module.exports = {
    name: "Member Info",
    description: "Shows information about any member of the server!",
    group: "Others",
    timeout: 20000,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const {RichEmbed} = require("discord.js")

        let member = message.mentions.members.first()
        let errorEmbed = new RichEmbed()
            .setColor(Config.red)
            .setTitle(Text.error)

        String.prototype.replaceAll = function (string1, string2, ignore) {
            return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
        }

        if(!member) 
        {
            if(!args.join(" "))
            {
                member = message.member
            }
            else 
            {
                member = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase().replaceAll("_", " "))
                if(!member) 
                {
                    member = message.guild.members.find(member => member.displayName.toLowerCase() === args[0].toLowerCase())
                    if(!member)
                    {
                        member = message.guild.members.find(member => member.id == args[0])
                        if(!member) 
                        {
                            return errorEmbed.addField(Text.user_didnt_find, Text.give_users_name_id_or_mention, false),
                            message.channel.send(errorEmbed) 
                        }
                    }
                }
            }
        }

        
    }
}