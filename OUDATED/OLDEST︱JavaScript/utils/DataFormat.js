function formatDate(date = new Date()) {
    var MonthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]

    var day = date.getDay() + 3
    var monthIndex = date.getUTCMonth()
    var year = date.getUTCFullYear()

    var hour = date.getUTCHours()
    var minutes = date.getUTCMinutes()
    var seconds = date.getUTCSeconds()

    if(hour < 10) {
        hour += "0"
    }
    if(minutes < 10) {
        minutes += "0"
    }
    if(seconds < 10) {
        seconds += "0"
    }

    return [hour, minutes, seconds].join(":") + "  " + day + " " + MonthNames[monthIndex] + " " + year
} 

module.exports = formatDate