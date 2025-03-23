const FS = require("fs")
const Config = require("F:/Metal Kirikot/utils/Config.json")
const ENG = require("F:/Metal Kirikot/languages/EN-US.json")
const RUS = require("F:/Metal Kirikot/languages/RU-RU.json")
const ITA = require("F:/Metal Kirikot/languages/IT-IT.json")

module.exports = MetalKirikot => {
    FS.readdir("F:/Metal Kirikot/events", 'utf8', (err, files) => {
        files.forEach((event, i) => {
            require(`F:/Metal Kirikot/events/${event}`)(MetalKirikot)
        })
    })
}