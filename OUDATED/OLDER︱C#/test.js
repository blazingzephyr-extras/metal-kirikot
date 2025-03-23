const FS = require("fs")
const roles = FS.readFileSync("./roles", "utf-8").split("\n")
console.log(roles)

const Client = require("discord.js").Client
const MetalKirikot = new Client()

MetalKirikot.on("ready", () => {
    let guild = MetalKirikot.guilds.cache.find(gld => gld.id == "739036923745796097")/*
    guild.roles.cache.forEach(role => {
        if(role.name != "Moderator" && role.name != "@everyone")
        try {
            role.delete()
        }
        catch { }
    })*/
    
    for(let i = 0; i < roles.length; i++) {
        let role = roles[i].split("	");
        guild.roles.create({ data: { name: role[0], color: role[1] }, reason: "Adding color roles!" })
    }
})

MetalKirikot.login("<token>")