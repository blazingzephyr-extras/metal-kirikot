module.exports = MetalKirikot => {
    MetalKirikot.on("ready", () => {
        MetalKirikot.guilds.forEach(server => {
            console.log(server.name, server.id)
            server.channels.forEach(channel => {
                console.log(channel.name, channel.id)
            })
        })
    })
}