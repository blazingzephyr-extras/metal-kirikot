const MongoClient = require("mongodb").MongoClient
const mongoClient = new MongoClient("mongodb+srv://MongoKirikot_3000:MTa_3%21i%3FhKiri@metalkirikot.ql0cy.mongodb.net/EEEE?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoClient.connect().then(mg => {

    e()
})

async function e() {

    const guild = mongoClient.db('668807021260439553');
    const settings = await guild.createCollection("Settings");
    const channelOverwrites = await guild.createCollection("ChannelOverwrites");
    const customCommands = await guild.createCollection("CustomCommands");
    const customEvents = await guild.createCollection("CustomEvents");

    settings.insertOne({ Prefixes: null, Language: 'en-US' });
}