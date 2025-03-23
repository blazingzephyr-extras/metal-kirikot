const Message = require("F:/Metal Kirikot/node_modules/discord.js/src/structures/Message")

function ArgsFilter(message = new Message(), prefix = new String()) {
    let args = message.content.split(" ").slice(1)
    return args
}

module.exports = ArgsFilter