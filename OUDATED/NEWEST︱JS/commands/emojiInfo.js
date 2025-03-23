module.exports = {
    name: "Emoji Info",
    description: "Shows information about any emoji of this server!",
    group: "Others",
    timeout: 0,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        let emoji = MetalKirikot.emojis.find(emoji => emoji.name == ":wizard_atashel:")
        console.log(emoji.url)
    }
}