const FS = require("fs")

module.exports = MetalKirikot => {
    /*MetalKirikot.on("message", message => {
        FS.readFile(`F:/Metal Kirikot/data/guilds/${message.guild.id}.txt`, 'utf8', (err, data) => {
            let Database = []
            data.split("\r").forEach((value, i) => {
                Database[i] = value.trim()
            })

            if(Database[5] === "ENABLED") {
                let blacklisted = Database[6].split(" ")
                let foundInText = false
    
                for(var i in blacklisted) {
                    if(message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
                }
    
                if(foundInText) {
                    message.delete()
                    message.channel.send(">:(")
                }
            }
        })
    })*/
}