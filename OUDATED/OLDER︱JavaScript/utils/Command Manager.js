const FS = require("fs")
const {RichEmbed} = require("discord.js")
const Config = require("F:/Metal Kirikot/utils/Config.json")
const EN = require("F:/Metal Kirikot/lanuages/EN-US.json")
const RU = require("F:/Metal Kirikot/lanuages/RU-RU.json")
const IT = require("F:/Metal Kirikot/lanuages/IT-IT.json")

module.exports = MetalKirikot => {
    MetalKirikot.on("message", message => {
        if(!message.guild) return 

        FS.readFile(`F:/Metal Kirikot/data/guilds/${message.guild.id}.txt`, 'utf8', (err, data) => {
            let Database = data.split("\r")

            let command = message.content.split(" ")[0].replace(Database[0], "")
            if(message.content.split(" ")[0] == Database[0] + command) 
            {
                try {
                    require(`F:/Metal Kirikot/commands/${command}`)("s")
                } catch {
                    message.channel.send("No command like that!")
                }
            } 
        })
    })
}