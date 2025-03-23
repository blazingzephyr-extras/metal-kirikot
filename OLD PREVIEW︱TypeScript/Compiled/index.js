"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
//
//mongodb+srv://MongoKirikot_3000:<password>@metalkirikot.ql0cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//
const uri = "";
const client = new mongodb_1.MongoClient(uri, { keepAlive: true, autoReconnect: true });
client.connect((one, two) => {
    console.log(one);
    console.log(two);
});
//EventHandler.Initialize(MetalKirikot)
//CommandHandler.Load()
