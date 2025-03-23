const FS = require("fs")
const DatabaseHandler = require("./database & functions.js")
//let Settings = new DatabaseHandler("F:/Metal Kirikot").readFile("settings")

const Discord = require("discord.js")
const Client = new Discord.Client
const RichEmbed = new Discord.RichEmbed

/*Event Handler*/
/*FS.readdir("events", 'utf8', (err, files) => {
    files.forEach(file => {
        require(`./events/${file}`)(Discord, Client, Settings, DatabaseHandler)
    })
})*/

/*Command Handler*/
let Cooldowns = new Set()

Client.on("message", message => {
    if(message.content.split(" ")[0] == "m!command")
    require("./commands/serverInfo").run(require("./database & functions").prototype, null, Client, null, require("./UI/languages/EN-US.json"), message, message.content.split(" ").slice(1))
})
Client.login("<token>")