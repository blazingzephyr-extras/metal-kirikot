const {Client} = require("discord.js")
const MetalKirikot = new Client()

require("F:/Metal Kirikot/utils/CommandHandler & DataHandler.js")(MetalKirikot)
require("F:/Metal Kirikot/utils/EventHandler.js")(MetalKirikot)

MetalKirikot.login("<token>")