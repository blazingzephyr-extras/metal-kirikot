const FS = require("fs")
const Config = require("F:/Metal Kirikot/utils/Config.json")
let Database = [new String]
const Cooldowns = new Set()
const {RichEmbed} = require("discord.js")

const Functions = []
Functions[0] = require("F:/Metal Kirikot/utils/FormateDate.js")
Functions[1] = require("F:/Metal Kirikot/utils/Sort1")
Functions[2] = require("F:/Metal Kirikot/utils/Sort2")
Functions[3] = require("F:/Metal Kirikot/utils/Sort3")
    
module.exports = MetalKirikot => {
    MetalKirikot.on("message", message => {
        let path = new String()
        if(message.guild === null) {
            path = "F:/Metal Kirikot/data/guilds/default.txt"
        } else {
            path = `F:/Metal Kirikot/data/guilds/${message.guild.id}.txt`
        }

        FS.readFile(path, 'utf8', (err, data) => {
            data.split("\r").forEach((value, index) => {
                Database[index] = value.trim()
            })

            const command = message.content.split(" ")[0].slice(Database[0].length) 
            const language = require(`F:/Metal Kirikot/UI/languages/${Database[1]}.json`)
            let args = message.content.split(" ").slice(1)

            if(!message.content.startsWith(Database[0] + command)) return
            try {
                if(require(`F:/Metal Kirikot/commands/${command}`).guildOnly == true && message.guild == null)
                {
                    let guildOnly = new RichEmbed()
                        .setTitle(language.error)
                        .setColor(Config.red)
                        .addField(language.this_is_guild_command, language.try_using_help[0] + Database[0] + language.try_using_help[1], true)
                    message.channel.send(guildOnly)
                }
                else
                {
                    if(Cooldowns.has(message.author.id))
                    {
                        let timeout = require(`F:/Metal Kirikot/commands/${command}`).timeout
                        let timeoutEmbed = new RichEmbed()
                            .setTitle(language.error)
                            .setColor(Config.red)

                        if (timeout == 1000) 
                        {
                            timeoutEmbed.addField(language.command_is_reloading[0] + timeout / 1000 + language.command_is_reloading[1], language.try_using_help[0] + Database[0] + language.try_using_help[1], true)
                        } 
                        else if (timeout > 1000 && 60000 > timeout) 
                        {
                            timeoutEmbed.addField(language.command_is_reloading[0] + timeout / 1000 + language.command_is_reloading[2], language.try_using_help[0] + Database[0] + language.try_using_help[1], true)
                        } 
                        else if (timeout == 60000) 
                        {
                            timeoutEmbed.addField(language.command_is_reloading[0] + timeout / 60000 + language.command_is_reloading[3], language.try_using_help[0] + Database[0] + language.try_using_help[1], true)
                        } 
                        else 
                        {
                            timeoutEmbed.addField(language.command_is_reloading[0] + timeout / 60000 + language.command_is_reloading[4], language.try_using_help[0] + Database[0] + language.try_using_help[1], true)
                        }

                        message.channel.send(timeoutEmbed)                       
                    }
                    else
                    {
                        require(`F:/Metal Kirikot/commands/${command}`).run(Database, Functions, MetalKirikot, Config, language, message, args)
                        Cooldowns.add(message.author.id)
    
                        setTimeout(() => {
                            Cooldowns.delete(message.author.id)
                        }, require(`F:/Metal Kirikot/commands/${command}`).timeout)
                    }
                }
            } catch {
                let thereIsNoCommandEmbed = new RichEmbed()
                    .setTitle(language.error)
                    .setColor(Config.red)
                    .addField(language.no_command_like_that,  language.try_using_help[0] + Database[0] + language.try_using_help[1], true)

                message.channel.send(thereIsNoCommandEmbed)
            }
        })
    })
}