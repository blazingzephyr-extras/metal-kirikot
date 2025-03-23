const { Client, Collection} = require("discord.js")

const Bot = new Client()
Bot.commands = new Collection()


require("F:/Metal Kirikot/utilities/EventHandler")(Bot)
require("F:/Metal Kirikot/utilities/CommandHandler")(Bot)


Bot.login("<token>")
module.exports = Bot