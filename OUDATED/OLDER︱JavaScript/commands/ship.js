module.exports = {
    name: "Ship",
    description: "Matchmakes something!",
    module: "ship",
    category: "Fun",
    usage: ["ship", "love", "s", "l"],
    cooldown: 0,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js"), FS = require("fs")
        let ship1 = args[0], ship2 = args[1]
        
        if(!ship1 && !ship2) ship1 = message.author.username, ship2 = message.guild.members.random().user.username
        if(ship1 && !ship2) ship2 = ship1, ship1 = F.replaceAll(message.author.username, " ", "_")

        if(message.mentions.members)
        {
            message.mentions.members.forEach(mention => {
                if(mention.toString() == ship1.replace("!", "")) ship1 = F.replaceAll(mention.user.username, " ", "_")
                if(mention.toString() == ship2.replace("!", "")) ship2 = F.replaceAll(mention.user.username, " ", "_")
            })
        }

        let file = new String()
        let love = Math.floor(Math.random() * 100) + 1
        let stringToWrite = [`${love} ${F.replaceAll(ship1.toLowerCase(), " ", "_")} ${F.replaceAll(ship2.toLowerCase(), " ", "_")}`]

        FS.readFileSync("F:/Metal Kirikot/data/others/ships", 'utf8').split("\r").forEach(string => {
            if(string.indexOf(ship1.toLowerCase()) > -1 && string.indexOf(F.replaceAll(ship2.toLowerCase(), " ", "_")) > -1)
            {
                love = parseInt(string.split(" ")[0])
                stringToWrite = null
            }
        })

        if(F.readFile("others/ships") == "") file = stringToWrite
        else file = FS.readFileSync("F:/Metal Kirikot/data/others/ships", 'utf8') + "\r" + stringToWrite

        if(stringToWrite != null) FS.writeFileSync("F:/Metal Kirikot/data/others/ships", file, 'utf8')

        let loveString = TXT.love[Math.floor(love / 10)]
        let loveEmbed = new RichEmbed().setColor(Config.pink).setDescription(`**${love}%** ${loveString}`)
        message.channel.send(`${TXT.matchmaking}\n🔻__***${ship1}***__\n🔺__***${ship2}***__`, loveEmbed)
        this.success = true
    }
}