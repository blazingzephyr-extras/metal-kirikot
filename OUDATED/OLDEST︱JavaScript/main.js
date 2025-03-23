const {Client} = require("discord.js")
const MetalKirikot = new Client()

MetalKirikot.on('ready', () => {
    
    MetalKirikot.generateInvite().then(invite => console.log(invite))
})

MetalKirikot.login("<token>")