const Bot = require("F:/Metal Kirikot/bot")
const Discord = require("discord.js")
const servers = {}
const BotStrings = require("F:/Metal Kirikot/utilities/Botstrings-EN-US.json")
const messageFilter = require("F:/Metal Kirikot/functions/messageFilter")
const argsFilter = require("F:/Metal Kirikot/functions/argsFilter")
const play = require("F:/Metal Kirikot/functions/play")
const RichEmbed = Discord.RichEmbed

Bot.on("message", async message  => {

    let messageGuild = message.guild.id
    let voiceConnection = message.guild.voiceConnection
    let messageChannel = message.channel
    

    if(!messageFilter(message, "metal!", `${BotStrings.play}`)) return
    let link = argsFilter(message, "metal!")


    let errorEmbed = new RichEmbed()
        .setColor([255, 0, 0])
        .setTitle(`${BotStrings.error}`)

        
    if(!message.member.voiceChannel) return errorEmbed.addField(`${BotStrings.didnt_join_voice_chat}`, `${BotStrings.join_the_voice_chat}`),
    messageChannel.send(errorEmbed)


    if(link === null) return errorEmbed.addField(`${BotStrings.didnt_give_the_link}`, `${BotStrings.give_link_first}`),
    messageChannel.send(errorEmbed)


    if(!servers[messageGuild]) servers[messageGuild] = { queue: [] }
    var server = servers[messageGuild]
    server.queue.push(link[1])


    if(!voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message)
    })

    let successEmbed = new RichEmbed()
        .setColor([0, 255, 0])
        .setTitle(`${BotStrings.success}`)
        .addField(`${BotStrings.now_playing}`, `${BotStrings.requested_by}`, false)

        messageChannel.send(successEmbed)
})