const FS = require("fs")
const Config = require("F:/Metal Kirikot/utils/Config.json")
const EN = require("F:/Metal Kirikot/languages/EN-US.json")
const RU = require("F:/Metal Kirikot/languages/RU-RU.json")
const ITA = require("F:/Metal Kirikot/languages/IT-IT.json")

module.exports = Bot => {
    FS.readdir("F:/Metal Kirikot/commands", (err, files) => {
        if(err) return console.log(err)
        if(!err) {
            let jsFiles = files.filter(file => file.split(".").pop() === "js")
            jsFiles.forEach(file => {
                var a = 100;
                Bot.on("message", message => {
                    let data = require(`F:/Metal Kirikot/data/servers/${message.guild.id}.txt`)
                    let language = data.split("\n").slice(1)[1]
                    let prefix = data.split("\n").slice(1)[2]
                    let log = data.split("\n").slice(1)[3]
                    const BotStrings = null

                    if(language == "RUS") {
                        BotStrings = RU
                    }
                    else if(language == "IT") {
                        BotStrings = ITA
                    }
                    else {
                        BotStrings == EN
                    }

                    let command = file.split(".")[0]
                    if(message.channel.type === "dm"||message.author.bot) return
                    if(!message.content.startsWith(`${prefix}${command}`)) return

                    let args = message.content.split(" ").slice(1)
                    let logchannel = message.guild.channels.find(channel => channel.name == log)
                    require(`F:/Metal Kirikot/commands/${file}`)(Bot, data, BotStrings, message, args)
                })
            })
        }
    })
}