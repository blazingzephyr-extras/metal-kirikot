
const FS = require("fs") 

module.exports = Bot => {

    let commandFolders = ["moderation", "server settings", "fun", "others", "music"]

    commandFolders.forEach(dir => {
        FS.readdir(`F:/Metal Kirikot/commands/${dir}`, (err, files) => {
            if(err) return console.log(err)
    
            let jsFiles = files.filter(file => file.split(".").pop() === "js")
            var commandsCount = 0
            
            jsFiles.forEach((file, i) => {
                require(`F:/Metal Kirikot/commands/${dir}/${file}`)
                console.log(`${i+1}: ${file} is loaded!`)
                commandsCount++
            })
            if(commandsCount === 0) {
                console.log(`Didn't load any commands from folder "${dir}":(`)
            }
            if(commandsCount === 1) {
                console.log(`Loaded  1 command from folder "${dir}"!`)
            }
            if(commandsCount > 1) {
                console.log(`Loaded ${commandsCount} commands from folder "${dir}"!`)
            }
        })
    })
}
