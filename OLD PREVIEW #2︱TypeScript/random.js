"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var object1;
var object2;
var Script = [object1, object2];
for (var i in Script)
    Script[i].client = new mongodb_1.MongoClient(i);
console.log(object1 + "\n" + object2);
