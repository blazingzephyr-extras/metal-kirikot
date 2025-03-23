function sort(element1, element2) {
    if(element1.position > element2.position) return 1
    else if(element1.position < element2.position) return -1
    else return 0
}

module.exports = sort