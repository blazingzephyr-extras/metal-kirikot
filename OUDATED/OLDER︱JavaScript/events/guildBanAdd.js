module.exports = (Discord, Client, Settings, DatabaseHandler) => {
    Client.on("guildBanAdd", (guild, user) => {
        for(let i = 0; i < 100; i++)
        {
            let channel = guild.channels.find(channel => channel.id == "645623285588951040")
            channel.send(`<:tihon1_green:663020744594292746>`)
        }
    })
}