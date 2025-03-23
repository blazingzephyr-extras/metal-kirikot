module.exports = {
    name: "Ship",
    description: "Ship something you want!😏",
    group: "Fun",
    timeout: 0,
    guildOnly: false,

    async run(Database, Functions, MetalKirikot, Config, T, message, args) {
        const {RichEmbed} = require("discord.js")
        const FS = require("fs")

        FS.readFile("F:/Metal Kirikot/data/others/ships.txt", 'utf8', (err, data) => {
            let ship1 = args[0]
            let ship2 = args[1]

            if(!ship1 && !ship2)
            {
                ship1 = message.author.username
                ship2 = message.guild.members.random().user.username
            }
            else if(!ship2)
            {
                ship2 = ship1
                ship1 = message.author.username
            }

            message.mentions.members.forEach(mention => {
                if(mention == ship1)
                {
                    ship1 = mention.user.username
                }
                if(mention == ship2)
                {
                    ship2 = mention.user.username
                }
            })

            let file = new String()
            let love = Math.floor(Math.random() * 100) + 1
            let stringToWrite = `${love} ${ship1.toLowerCase()} ${ship2.toLowerCase().replace(" ", "_")}`

            data.split("\r").forEach(string => {
                if(string.includes(ship1.toLowerCase()) && string.includes(ship2.toLowerCase().replace(" ", "_"))) 
                {
                    love = parseInt(string.split(" ")[0])
                    stringToWrite = null
                }
            })

            if (data == "")
            {
                file = stringToWrite
            }
            else {
                file = data + "\r" + stringToWrite
            }

            if(stringToWrite != null)
            {
                FS.writeFile("F:/Metal Kirikot/data/others/ships.txt", file, () => {})                
            }

            let loveString = new String()
            if(0 < love && love <= 10) {loveString = T.love[0]}
            else if(10 < love && love < 30) {loveString = T.love[1]}
            else if(30 < love && love < 40) {loveString = T.love[2]}
            else if(40 < love && love < 50) {loveString = T.love[3]}
            else if(50 < love && love < 60) {loveString = T.love[4]}
            else if(60 < love && love < 70) {loveString = T.love[5]}
            else if(70 < love && love < 80) {loveString = T.love[6]}
            else if(80 < love && love < 90) {loveString = T.love[7]}
            else if(90 < love && love < 100) {loveString = T.love[8]}
            else if (love == 100) {loveString = T.love[9]}
            else {loveString = T.love[10]}


            let loveEmbed = new RichEmbed()
                .setColor(Config.pink)
                .setDescription(`**${love}%** ${loveString}`)

            message.channel.send(`${T.matchmaking}\n🔻__***${ship1}***__\n🔺__***${ship2}***__`, loveEmbed)
        })
    }
}