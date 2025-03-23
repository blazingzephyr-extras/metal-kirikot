'use strict';

const BinaryReader = require("binary-file")
const reader = new BinaryReader("./file.bin", "r")
reader.open()
console.log(reader.readString(8))