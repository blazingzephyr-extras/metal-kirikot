const YouTube = require("ytdl-core")
var servers = {}

function play (connection = new String(), message = new String()) {
    var server = servers.message[message.guild.id]

    server.dispatcher = connection.playStream(YouTube(server.queue[0], {filter: "audioonly"}))
    server.queue.shift()

    server.dispatcher.on("end", function () {
        if(server.queue[0]) {
            play(connection, message)
        } else {
            connection.disconnect()
        }
    })
}

module.exports = (play)