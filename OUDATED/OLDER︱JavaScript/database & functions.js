const FS = require("fs")
const {Message, RichEmbed} = require("discord.js")

/**
 * Really nice util for reading and writing data! Made by me for me! XD
 */
class DatabaseHandler {
    /**
     * @param {DatabaseOptions} [options] Options for Database Handler! :>
     */
    constructor(DataFolder = new String, message = new Message)
    {
        this.folder = DataFolder
        this.message = message
    }

/**
     * Sets an error embed to the same channel!
     */
    embed(
        /***
         * Name of the field!
         * @param {String} header
         */
        name = new String(), 
        /***
         * Value of the field!
         * @param {String} value
         */
        value = new String(),
        /**
         * Header of the embed! 
         */
        header = null)
    {

        let color = FS.readFileSync("settings", 'utf8').split("\n")[5]
        let Embed = new Discord.RichEmbed()
        Embed.setTitle(header)
            .setColor(color)
            .addField(name, value)


        console.log(Embed)
    }

    /**
     * Gets parsed content of file!
     */
    readFile(
        /**A path to file, starting from data folder
        @type {String}
        */ 
       pathToFile = new String) 
    {
        let data = [[]]
        let fileContent = FS.readFileSync(`${this.folder}/${pathToFile}`, 'utf8')

        fileContent.split("\n").forEach((value, i) => {
            data[i] = []

            value.trim().split(" ").forEach((value, j) => {
                data[i][j] = []

                let parsedValue = parseFloat(value)
                if(parsedValue.toString() == "NaN")
                {
                    if(value == "true")
                    {
                        parsedValue = true
                    }
                    else if(value == "false")
                    {
                        parsedValue = false
                    }
                    else if(value == "null")
                    {
                        parsedValue = null
                    }
                    else 
                    {
                        parsedValue = value
                    }
                }

                data[i][j] = parsedValue
            })
        })
        return data
    }

    /**
     * Writes file or adds content to it!
     */
    writeFile(
        /**A path to file, starting from Data folder
        @type {String}
        */ 
        pathToFile = new String, 

        /**
         * Data to write to file! If file is empty just tool just writes content to it, if not — continues already started content
         * @type {String}
         */
        content = new String()) 
    {
        let toWrite = new String()
        let fileContent = FS.readFileSync(`${this.folder}/${pathToFile}`, 'utf8')

        if(fileContent == "")
        {
            toWrite = content
        }
        else 
        {
            toWrite = fileContent + "\n" + content
        }

        FS.writeFileSync(`${this.folder}/${pathToFile}`, toWrite, 'utf8')
    }

    /**
     * Sends message to log if it's enabled!
     */
    log(
        /***
         * Data to scan for settings!
         * @param {[String]} data
         * @param {String || RichEmbed} content
         */
        data = [], 
        /***
         * Content to send to log!
         */
        content = new String || new RichEmbed)
    {
        let enabledLog = data.logEnabled
        if(enabledLog)
        {
            if(!data.logID)
            {
                this.message.channel.send(content)
            }
            else
            {
                this.message.guild.channels.find(channel => channel.id == data.logID).send(content)
            }
        }
    }

    /**
     * Sets an error embed to the same channel!
     */
    embed(
        /***
         * Name of the field!
         * @param {String} header
         */
        name = new String(), 
        /***
         * Value of the field!
         * @param {String} value
         */
        value = new String(),
        /**
         * Header of the embed! 
         */
        header = null)
    {
        if(!header)
        {
            if(this.message.guild) header = require(`./UI/languages/${FS.readFileSync(`data/guildCustomizations/${this.message.guild.id}`, 'utf8').split("\n")[1]}.json`).error
            else header = require(`./UI/languages/en-US.json`).error
        }

        let color = FS.readFileSync("settings", 'utf8').split("\n")[5]
        let Embed = new RichEmbed()
            .setTitle(header)
            .setColor(color)
            .addField(name, value)

        if(this.message.guild) Embed.setFooter(`${this.message.guild.name} | ${this.message.guild.me.user.tag}` , this.message.guild.me.user.displayAvatarURL)
        else Embed.setFooter(`${this.message.client.user.tag}`, this.message.client.user.displayAvatarURL)

        this.message.channel.send(Embed)
    }

    /**
     * Replaces all entries of the string!
     */
    replaceAll(
        /***
         * String to use for replacing!
         * @param {String} inputString
         */
        inputString = new String, 
        /***
         * String to search in the original string!
         * @param {String} searchValue
         */
        searchValue = new String, 
        /***
         * Replace orignal symbols!
         * @param {String} replaceValue
         */
        replaceValue = new String)
    {
        let pattern = new RegExp(searchValue, "g")
        let matchArray = inputString.match(pattern)

        if(matchArray)
        {
            let count = matchArray.length
            let replacedString = inputString

            for(let i = 0; i < count; i++)
            {
                replacedString = replacedString.replace(searchValue, replaceValue)
            }
            return replacedString
        }
        else 
        {
            return inputString
        }
    }

    /**
     * Find member using message args!
     */
    findMember(returnErrorIfNotFound = new Boolean(), Index = new Number())
    {
        let language = FS.readFileSync(`data/guildCustomizations/${this.message.guild.id}`, 'utf8').split("\n")[1]
        let text = require(`./UI/languages/${language}.json`)

        let errorEmbed = new RichEmbed()
            .setTitle(text.error)
            .setColor(FS.readFileSync("settings", 'utf8').split("\n")[5])
            
            if(this.message.guild) errorEmbed.setFooter(`${this.message.guild.name} | ${this.message.guild.me.user.tag}` , this.message.guild.me.user.displayAvatarURL)
            else errorEmbed.setFooter(`${this.message.client.tag}`, this.message.client.user.displayAvatarURL)

        let args = this.message.content.split(" ").slice(1)
        let member = this.message.mentions.members.first()

        if(!member) 
        {
            if(args[0])
            {
                let member = this.message.guild.members.find(member => member.id == args[0] || member.displayName.toLowerCase() == args[0].toLowerCase() || member.displayName.toLowerCase() == this.replaceAll(args[0].toLowerCase(), "_", " "))
                
                if(!member)
                {
                    if(returnErrorIfNotFound)
                    {
                        errorEmbed.addField(text.there_is_no_user[0].replace("%member", args[0]), text.there_is_no_user[1])
                        this.message.channel.send(errorEmbed)
                    }

                    return null
                }

                return member
            }
            else
            {
                if(returnErrorIfNotFound)
                {
                    errorEmbed.addField(text.didnt_set_user[Index], text.set_the_user)
                    this.message.channel.send(errorEmbed)
                }

                return null
            }
        }
        else
        {
            return member
        }
    }

    /**
     * Formates Date 
     * @param {Date} date
     */
    formateDate(date = new date, Text)
    {
        var MonthNames = [
            Text.months[0], Text.months[1], Text.months[2], Text.months[3], Text.months[4], Text.months[5], 
            Text.months[6], Text.months[7], Text.months[8], Text.months[9], Text.months[10], Text.months[11]
        ]
    
        var day = date.getDate()
        var month = date.getUTCMonth()
        var year = date.getUTCFullYear()
    
        var hour = date.getUTCHours()
        var minutes = date.getUTCMinutes()
        var seconds = date.getUTCSeconds()
    
        if(hour < 10) {
            hour = "0" + hour
        }
        if(minutes < 10) {
            minutes = "0" + minutes
        }
        if(seconds < 10) {
            seconds = "0" + seconds
        }
    
        return `${hour}:${minutes}:${seconds}   ${day} ${MonthNames[month]} ${year}`
    }

    confirmAction(content = new String || new RichEmbed, secs = new Number, confirmed = function(){}, disproved = function(){})
    {
        this.message.channel.send(content).then(confirmationMessage => {
            confirmationMessage.react('✅').then(() => confirmationMessage.react('❌'))
            
            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === this.message.author.id
            }

            confirmationMessage.awaitReactions(filter, { max: 1, time: secs * 1000, errors: ['time'] }).then(collected => {
                const reaction = collected.first()

                if(reaction.emoji.name === '✅')
                {
                    confirmed()
                }
                else
                {
                    disproved()
                }
            })
        }).catch(() => {
            confirmationMessage.delete(),
            this.message.delete()
        })
    }

    sort1(element1, element2)
    {
        if(element1.position > element2.position) return 1
        else if(element1.position < element2.position) return -1
        else return 0
    }
    sort2(element1, element2)
    {
        if(element1.position > element2.position) return -1
        else if(element1.position < element2.position) return 1
        else return 0
    }
    sort3(element1, element2)
    {
        if(element1.createdTimestamp  > element2.createdTimestamp ) return 1
        else if(element1.createdTimestamp  < element2.createdTimestamp ) return -1
        else return 0
    }

    boolean(value = new Boolean(), TXT)
    {
        if(value == false)
        {
            return TXT.boolean[0]
        }
        else 
        {
            return TXT.boolean[1]
        }
    }

    /**
     * Parses value of seconds into hours, minutes and seconds
     * @param {Number} sec 
     */
    secondsToHMS(sec = Number()) {
        var hours = Math.floor(sec / 3600)
        var minutes = Math.floor(sec % 3600 / 60)
        var seconds = Math.floor(sec % 3600 % 60)
    
        return [('0' + hours).slice(-2), ('0' + minutes).slice(-2), ('0' + seconds).slice(-2)].join(":")
    }
}

module.exports = DatabaseHandler