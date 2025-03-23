function sort(element1, element2) {
    if(element1.createdTimestamp  > element2.createdTimestamp ) return 1
    else if(element1.createdTimestamp  < element2.createdTimestamp ) return -1
    else return 0
}

module.exports = sort