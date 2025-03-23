const Client = require("discord.js").Client
const MetalKirikot = new Client()

MetalKirikot.on("ready", () => {
    let guild = MetalKirikot.guilds.cache.find(gld => gld.id == "668807021260439553")
    guild.members.cache.forEach(member => {
        member.roles.set([])
    })
})

MetalKirikot.login("<token>")