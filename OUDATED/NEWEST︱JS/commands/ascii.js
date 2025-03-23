module.exports = {
    name: "Ascii",
    description: "Transforms text and images into Ascii-art!",
    group: "Fun",
    timeout: 5000,
    guildOnly: true,

    async run(Database, Functions, MetalKirikot, Config, Text, message, args) {
        const Ascii = require("ascii-art")
        const {RichEmbed} = require("discord.js")

        let font = args[0]

        let text = args.slice(1).join(" ")
        let errorEmbed = new RichEmbed()
            .setTitle(Text.error)
            .setColor(Config.red)

        if(!font) return errorEmbed.addField(Text.didnt_set_the_font, Text.set_the_font, false),
        message.channel.send(errorEmbed)

        if(font.toLowerCase() == "doom"||font.toLowerCase() == "rusted")
        {
            if(!text) return errorEmbed.addField(Text.didnt_set_the_text, Text.set_the_text, false),
            message.channel.send(errorEmbed)
    
            let toCheck = new Set()
            let found = false
            let notThatSymbol = new String()
            let symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
            "_", "*", "&", "@", "!", "?", "`" , "#", `"`, "'", "$", ";", ":", "%", "(", ")", "-", "+", "-", ".", "<", ">", "/", " "]

            symbols.forEach(symbol => {
                toCheck.add(symbol)
            })

            for(let i = 0; i < text.length; i++)
            {
                if(!toCheck.has(text.toLowerCase().charAt(i)))
                {
                    found = true
                    notThatSymbol = text.charAt(i)
                }
            }

            if(found == true) return errorEmbed.addField(Text.you_cant_use_this_symbol, `*${Text.dont_use_this} "${notThatSymbol}"!*`,false),
            message.channel.send(errorEmbed)

            font = font.charAt(0).toUpperCase() + font.substr(1)
            Ascii.font(text, font, (err, rendered) => {
                message.channel.send(rendered, {
                    code: "yaml"
                })
            })
        }
        else
        {
            errorEmbed.addField(Text.there_is_no_font, Text.use_one_of_these_font, false),
            message.channel.send(errorEmbed)
        }
    }
}