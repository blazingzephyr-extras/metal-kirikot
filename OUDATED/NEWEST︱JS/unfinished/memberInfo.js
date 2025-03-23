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

        let title = `👤**${member.user.tag}**${Text.info_about}`
        let nickname = member.nickname
        let ID = member.id
        let isOwner = new String()
        let status = new String()
        let game = Text.none
        let muted = member.mute//.toString().charAt(0).toUpperCase() + member.mute.toString().slice(1)
        let deafed = member.deaf//.toString().charAt(0).toUpperCase() + member.deaf.toString().slice(1)
        //let lastActive = new String()
        let accountCreation = Functions[0](member.user.createdAt, Text)
        let joinedGuild = Functions[0](member.joinedAt, Text)
        let rolesCount = 0, roles = new String()

        if(member.user.bot) 
        {
            title = `BOT**${member.user.tag}**${Text.info_about}`
        }

        if(nickname == null) 
        {
            nickname = Text.none
        }

        if(member.bannable == true) 
        {
            isOwner = Text.false
        } 
        else 
        {
            isOwner = Text.true
        }

        if(member.presence.status == "online") {status = Text.status[1]}
        if(member.presence.status == "idle") {status = Text.status[2]}
        if(member.presence.status == "offline") {status = Text.status[3]}
        if(member.presence.status == "dnd") {status = Text.status[4]}

        member.roles.sort(Functions[2]).forEach(role => {
            rolesCount++
            roles += role + "\n"
        })

        if(member.presence.game) 
        {
            if(member.presence.game.name == "Custom Status")
            {
                if(member.presence.game.state == null)
                {
                    game = Text.none
                } 
                else 
                {
                    game = member.presence.game.state
                }
                
            }
            else
            {
                game = Text.activity[member.presence.game.type] + member.presence.game.name
            }

            if(member.presence.game.url) 
            {
                game += ` (URL: ${member.presence.game.url})`
            }
        }

        let userEmbed = new RichEmbed()
            .setTitle(title)
            .setColor(Config.green2)
            .setImage(member.user.displayAvatarURL)
            .setFooter(`${message.guild.me.displayName} | ${message.guild.name}`, message.guild.me.user.displayAvatarURL, false)
            .addField(Text.nickname, nickname, false)
            .addField(Text.userID, ID, false)
            .addField(Text.owner, isOwner, false)
            .addField(Text.status[0], status, false)
            .addField(Text.game, game, false)
            .addField(Text.muted, muted, false)
            .addField(Text.deafed, deafed, false)
            .addField(Text.accountCreation, accountCreation, false)
            .addField(Text.joined_guild, joinedGuild, false)
            .addField(Text.roles + rolesCount, roles, false)

        message.channel.send(userEmbed)
    }
}