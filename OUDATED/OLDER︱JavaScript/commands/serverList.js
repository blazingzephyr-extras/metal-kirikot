module.exports = {
    name: "Server List",
    description: "Shows list of servers that have bot!",
    module: "serverList",
    category: "Info",
    usage: ["serverlist", "sl", "guildlist", "gl"],
    cooldown: 15,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        let {RichEmbed} = require("discord.js")
        let title = TXT.serverList.replace("%bot", Client.user.tag)
        let servers = new String()

        Client.guilds.forEach(guild => {
            servers += `***${guild}***\n`       
        })

        let ListEmbed = new RichEmbed()
            .setTitle(title)
            .setColor(Config.cream)
            .setDescription(servers)

        if(message.guild) ListEmbed.setFooter(`${message.guild.name} | ${message.guild.me.user.tag}`, message.guild.me.user.displayAvatarURL)
        else ListEmbed.setFooter(message.client.user.tag, message.client.user.displayAvatarURL)

        message.channel.send(ListEmbed)
        this.success = true
    }
}