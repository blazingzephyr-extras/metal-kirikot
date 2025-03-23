const Message = require("F:/Metal Kirikot/node_modules/discord.js/src/structures/Message")
const User = require("F:/Metal Kirikot/node_modules/discord.js/src/structures/User")
const Channel = require("F:/Metal Kirikot/node_modules/discord.js/src/structures/Message")

function MessageFilter(message = new Message(), prefix = new String(), commandName = new String()) {
    let IfCommand = false
    let messageChannel = message.channel = new Channel()
    let messageAuthor  = message.author = new User()
    if(!messageChannel.type === "dm"|| messageAuthor.bot) return IfCommand
    if(!message.content.startsWith(`${prefix}${commandName}`)) return IfCommand

    IfCommand = true
    return IfCommand
}

module.exports = MessageFilter