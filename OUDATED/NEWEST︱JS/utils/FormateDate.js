
function FormatDate(date = new Date(), Text) {
        var MonthNames = [
            Text.months[0], Text.months[1], Text.months[2], Text.months[3], Text.months[4], Text.months[5], 
            Text.months[6], Text.months[7], Text.months[8], Text.months[9], Text.months[10], Text.months[11]
        ]
    
        var day = date.getDate()
        var monthIndex = date.getUTCMonth()
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
    
        return[hour, minutes, seconds].join(":") + "  " + day + " " + MonthNames[monthIndex] + " " + year
}

module.exports = FormatDate