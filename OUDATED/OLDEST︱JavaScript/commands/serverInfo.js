const {RichEmbed} = require("discord.js")
const DateFormat = require("F:/Metal Kirikot/utils/DataFormat")

module.exports = (MetalKirikot, Database, Config, Text, message, args) => {
   let title = message.guild.name + Text.info
   let region = Text.region[message.guild.region]
   
   let owner = `<@${message.guild.ownerID}>`
   let afkChannel = new String()
   let afkTimeout = new String()
   let verificationLevel = Text.verification_level[message.guild.verificationLevel]
   let defaultChannel = new String()

   message.channel.send(message.guild.region + verificationLevel)
}