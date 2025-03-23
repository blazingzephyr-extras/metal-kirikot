const FS = require("fs")

module.exports = MetalKirikot => {
    MetalKirikot.on("guildCreate", guild => {
        let dataToWrite = "metal!\r" +
                          "ENG\r" +
                          "DISABLED\r" +
                          "Hello there! You've been kicked in **{GUILD}** for **{REASON}**!\r" + 
                          "Hello there! You've been banned in **{GUILD}** for **{REASON}**!" +
                          "DISABLED"

        FS.writeFileSync(`F:/Metal Kirikot/data/guildSettings/${guild.id}.txt`, dataToWrite, 'utf8')
    })
}