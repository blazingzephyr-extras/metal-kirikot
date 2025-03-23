module.exports = {
    name: "Ascii Text",
    description: "Transforms text to ascii symbols!",
    module: "ascii",
    category: "Fun",
    usage: ["ascii", "ascii-text", "as"],
    cooldown: 5,
    guildOnly: false,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const FS = require("fs"), Figlet = require("figlet")
        let font = args[0]
        let verticalLayout = args[1]
        let horizontalLayout = args[2]
        let text = args.slice(3).join(" ")

        if(!font) return F(TXT.didnt_set_the_font[0], TXT.didnt_set_the_font[1])

        let found = false
        let files = FS.readdirSync(`${__dirname}/../node_modules/figlet/fonts`, 'utf-8')
        files.forEach(file => {
            if(file.toLowerCase().replace(" ", "_") == font.toLowerCase() + ".flf")
            {
                found = true
                font = file.replace(".flf", "")
            }
        })
        if(!found) return F(TXT.there_is_no_font[0], TXT.there_is_no_font[1].replace("%prefix", "m!"))

        let kergningMethods = ["controlled_smushing", "default", "fitted", "full", "universal_smushing"]
        if(!verticalLayout) return F(TXT.didnt_input_layout[0], TXT.didnt_input_layout[2])
        if(kergningMethods.indexOf(verticalLayout.toLowerCase()) == -1) return F(TXT.didnt_input_layout[1], TXT.didnt_input_layout[3])
        if(!horizontalLayout) return F(TXT.didnt_input_layout[1], TXT.didnt_input_layout[3])
        if(kergningMethods.indexOf(horizontalLayout.toLowerCase()) == -1) return F(TXT.didnt_input_layout[1], TXT.didnt_input_layout[3])
        if(!text) return F(TXT.didnt_input_the_string[0], TXT.didnt_input_the_string[1])

        let result = Figlet.textSync(text, {
            font: font,
            verticalLayout: verticalLayout,
            horizontalLayout: horizontalLayout
        })

        let code = Math.floor(Math.random() * 2)
        switch(code)
        {
            case 0: message.channel.send(result, {
                        code: "yaml"
                    })
                    this.success = true
                    break
                    
            case 1: message.channel.send(result, {
                        code: "fix"
                    })
                    this.success = true
                    break
        }
    }
}