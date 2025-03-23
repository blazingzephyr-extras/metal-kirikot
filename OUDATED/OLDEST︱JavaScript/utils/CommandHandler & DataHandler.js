const FS = require("fs")
const Config = require("F:/Metal Kirikot/utils/Config.json")
const ENG = require("F:/Metal Kirikot/languages/EN-US.json")
const RUS = require("F:/Metal Kirikot/languages/RU-RU.json")
const ITA = require("F:/Metal Kirikot/languages/IT-IT.json")

module.exports = MetalKirikot => {
    FS.readdir("F:/Metal Kirikot/commands", 'utf8', (err, files) => {
        files.forEach(file => {
            MetalKirikot.on("message", message => {
                if(message.guild) {
                    FS.readFile(`F:/Metal Kirikot/data/guilds/${message.guild.id}.txt`, 'utf8', (err, data) => {
                        let Database = []
                        data.split("\r").forEach((value, i) => {
                            Database[i] = value.trim()
                        })
    
                        let command = file.split(".")[0].toLowerCase()
                        let args = message.content.split(" ").slice(1)
                        if(message.author.bot) return
                        if(!message.content.toLowerCase().startsWith(Database[1] + command)) return
                        
                        if(Database[8] === "ENG") {
                            require(`F:/Metal Kirikot/commands/${command}.js`)
                            (MetalKirikot, Database, Config, ENG, message, args)
                        }
                        if(Database[8] === "RUS") {
                            require(`F:/Metal Kirikot/commands/${command}.js`)
                            (MetalKirikot, Database, Config, RUS, message, args)
                        }
                        if(Database[8] === "ITA") {
                            require(`F:/Metal Kirikot/commands/${command}.js`)
                            (MetalKirikot, Database, Config, ITA, message, args)
                        }
                    })
                }
            })
        })
    })
}