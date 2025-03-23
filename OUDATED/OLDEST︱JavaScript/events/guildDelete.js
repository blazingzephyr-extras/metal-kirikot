const FS = require("fs")

module.exports = MetalKirikot => {
    MetalKirikot.on("guildDelete", guild => {
        FS.unlink(`F:/Metal Kirikot/data/guildSettings/${guild.id}.txt`, err => {
            if(err) console.log(err)
        })
    })
}