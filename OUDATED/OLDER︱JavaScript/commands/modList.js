module.exports = {
    name: "Moderation List",
    description: "Shows list of banned and muted users in this server!",
    module: "moderationList",
    category: "Moderation",
    usage: ["modList", "moderationList", "ml", "mutedList", "bannedList", "bl"],
    cooldown: 30,
    guildOnly: true,
    beta: true,

    run(F, Data, Client, Config, TXT, message, args)
    {
        const Ascii = require("ascii-table")
        const {Attachment} = require("discord.js")
        const FS = require("fs")
        const {Canvas} = require("canvas-constructor")

        let banned1 = FS.readFileSync(`F:/Metal Kirikot/data/bans/${message.guild.id}`, 'utf8').split("\n") 
        let banned2 = FS.readFileSync(`F:/Metal Kirikot/data/tempbans/${message.guild.id}`, 'utf8').split("\n")
        let muted1 = FS.readFileSync(`F:/Metal Kirikot/data/mutes/${message.guild.id}`, 'utf8').split("\n") 
        let muted2 = FS.readFileSync(`F:/Metal Kirikot/data/tempmutes/${message.guild.id}`, 'utf8').split("\n")

        let background = FS.readFileSync("F:/Metal Kirikot/UI/images/black_background.jpg")
        let tableHeading = FS.readFileSync("F:/Metal Kirikot/UI/images/table_heading.jpg")
        let table = FS.readFileSync("F:/Metal Kirikot/UI/images/table.jpg")

        if(!message.member.hasPermission("ADMINISTRATOR")) return F.embed(TXT.not_enough_permissions[0], TXT.not_enough_permissions[4])
        if(banned1 + banned2 == "") 0
        else
        {
            let banTable = new Canvas(2000, 1000)
                .addImage(background, 0, 0, 2000, 1000)
                .addImage(tableHeading, 0, 0, 2000, 108)
                .setColor("#2ECD00")
                .setTextFont("F:/Metal Kirikot/UI/fonts/VoidPixel7.ttf")
                .setTextSize(28)
                .setTextAlign('center')
                .addText(TXT.banList[0], 1000, 49).addText(TXT.banList[1], 205, 92).addText(TXT.banList[2], 545, 92).addText(TXT.banList[3], 885, 92).addText(TXT.banList[4], 1237, 92).addText(TXT.banList[5], 1570, 92).addText(TXT.banList[6], 1860, 92)

            let banned = [].concat(banned1, banned2)
            banned.forEach((element, i) => {
                if(element == "") banned.splice(i, 1)
            })
            banned.forEach((member, i) => {
                let info = member.split(" ")
                banTable.addImage(table, 0, 104 + 43 * i)
                let banDuration = "∞"
                if(info[5]) banDuration = F.replaceAll(info[5], "_", " ")

                banTable.addText(F.replaceAll(info[0], "_", " "), 205, 135 + 43 * i).addText(info[1], 545, 135 + 43 * i).addText(F.replaceAll(info[2], "_", " "), 885, 135 + 43 * i).addText(F.replaceAll(info[3], "_", " "), 1237, 135 + 43 * i)
                .addText(F.replaceAll(info[4], "_", " "), 1570, 135 + 43 * i).addText(banDuration, 1860, 135 + 43 * i)
            })

            let attachment = new Attachment(banTable.toBuffer(), "table.png")
            message.author.send(attachment)
        }

        if(muted1 + muted2 == "") 0
        else
        {
            let muteTable = new Canvas(2000, 1000)
                .addImage(background, 0, 0, 2000, 1000)
                .addImage(tableHeading, 0, 0, 2000, 108)
                .setColor("#2ECD00")
                .setTextFont("F:/Metal Kirikot/UI/fonts/VoidPixel7.ttf")
                .setTextSize(28)
                .setTextAlign('center')
                .addText(TXT.muteList[0], 1000, 49).addText(TXT.muteList[1], 205, 92).addText(TXT.muteList[2], 545, 92).addText(TXT.muteList[3], 885, 92).addText(TXT.muteList[4], 1237, 92).addText(TXT.muteList[5], 1570, 92).addText(TXT.muteList[6], 1860, 92)

            let muted = [].concat(muted1, muted2)
            muted.forEach((element, i) => {
                if(element == "") muted.splice(i, 1)
            })
            muted.forEach((member, i) => {
                let info = member.split(" ")
                muteTable.addImage(table, 0, 104 + 43 * i)
                let muteDuration = "∞"
                if(info[5]) banDuration = F.replaceAll(info[5], "_", " ")

                muteTable.addText(F.replaceAll(info[0], "_", " "), 205, 135 + 43 * i).addText(info[1], 545, 135 + 43 * i).addText(F.replaceAll(info[2], "_", " "), 885, 135 + 43 * i).addText(F.replaceAll(info[3], "_", " "), 1237, 135 + 43 * i)
                .addText(F.replaceAll(info[4], "_", " "), 1570, 135 + 43 * i).addText(muteDuration, 1860, 135 + 43 * i)
            })

            let attachment = new Attachment(muteTable.toBuffer(), "table.png")
            message.author.send(attachment)
        }
    }
}