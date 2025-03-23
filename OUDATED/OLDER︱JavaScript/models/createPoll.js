module.exports = {
    name: "Create Poll",
    description: "Creates poll!",
    module: "poll",
    category: "Others",
    usage: ["poll", "p"],
    cooldown: 0,
    guildOnly: true,
    beta: true,

    run(F, data, Client, Config, TXT, message, args)
    {
        const {RichEmbed} = require("discord.js")
        let Embed = new RichEmbed().setTitle(TXT.setup[0]).setColor(Config.orange).setDescription(TXT.setup[1])

        let title = null
        let expiresIn = null
        let numberOfFields = null
        let fileds = [ [ new String() ] ]

        const filter = msg => msg.author.id == message.author.id


        this.success = true




        /*
        const filter = msg => msg.author.id == message.author.id
        let title = new String()
        let expiresIn = null
        let numberOfFields = null
        let fileds = [ [ new String() ] ]

        message.channel.awaitMessages(filter, { max: 1 }).then(collected1 => {
            title = collected1.first().content

            collected1.channel.send(Embed.setDescription(TXT.setup[2]))
            collected1.channel.awaitMessages(filter, { max: 1 }).then(collected2 => {
                
                while(!expiresIn)
                {
                    let value = parseInt( collected2.content.replace(collected2.content.split("").last(), "") )
                    if(!value.toString() == "NaN")
                    {
                        switch(collected2.content.split("").last())
                        {
                            case "s": expiresIn = value
                                    break

                            case "m": expiresIn = value * 60
                                    break

                            case "h": expiresIn = value * 360
                                    break

                            case "d": expiresIn = value * 8640

                            default: message.channel.send( Embed.setDescription(TXT.setup[4]) )
                        }
                    }
                    else message.channel.send( Embed.setDescription(TXT.setup[3]) )
                }

                console.log(expiresIn)
            })
        })*/
        //title, expires in, count of fields, name and reaction
    }
}