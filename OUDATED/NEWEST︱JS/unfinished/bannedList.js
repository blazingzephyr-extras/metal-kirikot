module.exports = {
    name: "Banned List",
    description: "Shows list of users who were banned in this server!",
    group: "Moderation",
    timeout: 20000,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const FS = require("fs")
        const Table = require("ascii-table")

        FS.readFile(`F:/Metal Kirikot/data/bans/${message.guild.id}.txt`, 'utf8', (err, data) => {
            if(data == "")
            {
                message.channel.send("There isn't any banned users in this server!")
            } 
            else 
            {
                let BannedUser = data.split("\n")
                let banTable = `╔══════════════════╦════════════════════╦══════════════════╦════════════╗\n║   ${Text.members_tag}   ║${Text.members_ID}║${Text.banned_by}║${Text.reason}║\n╚══════════════════╩════════════════════╩══════════════════╩════════════╝`

                String.prototype.replaceAll = function (string1, string2, ignore) {
                    return this.replace(new RegExp(string1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(string2)=="string")?string2.replace(/\$/g,"$$$$"):string)
                }

                BannedUser.forEach(info => {
                    let BannedInfo = info.replaceAll("_", " ").split(" ")
                })

                 message.channel.send("```" + banTable + "```")
            }
        })
    }
}