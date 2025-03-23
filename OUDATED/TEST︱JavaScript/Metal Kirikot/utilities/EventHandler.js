
const FS = require("fs") 


module.exports = Bot => {
    FS.readdir("F:/Metal Kirikot/events", (err, files) => {
        if(err) return console.log(err)

        var eventsCount = 0
        let jsFiles = files.filter(file => file.split(".").pop() === "js")

        jsFiles.forEach((file, i) => {
            require(`F:/Metal Kirikot/events/${file}`)
            console.log(`${i+1}: ${file} is loaded!`)
            eventsCount++
        })
        if(eventsCount === 0) {
            console.log(`Didn't load any events:(\n`)
        }
        if(eventsCount === 1) {
            console.log(`Loaded  1 event total!\n`)
        }
        else {
            console.log(`Loaded ${eventsCount} events total!\n`)
        }
    })
}