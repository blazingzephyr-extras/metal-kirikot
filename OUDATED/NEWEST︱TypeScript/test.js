const Discord = require("discord.js")
const MK = new Discord.Client();

MK.on("ready", () => {

    MK.guilds.fetch("816668067798319105").then(server => {
        console.log(server)

        var user = MK.users.cache.find(user => user.id == "448836861155213312")
        console.log(user)

        server.addMember(user, { accessToken: "" }).then(member => {
            
            console.log(member)
        })
    });
})

MK.login("<token>")