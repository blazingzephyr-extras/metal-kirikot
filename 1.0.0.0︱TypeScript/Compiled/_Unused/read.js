/*import { Client } from "discord.js";
import { Collection, MongoClient } from "mongodb";
import { ChannelSettings } from "../Core/Database/ChannelSettings";

Name()

async function Name() {
    
    const client = new Client()
    await client.login("<token>")

    console.log(client.channels.cacheType)

    const mongoClient = new MongoClient('mongodb+srv://MongoKirikot_3000:MTa_3%21i%3FhKiri@metalkirikot.ql0cy.mongodb.net/GuildsSettings?retryWrites=true&w=majority')
    await mongoClient.connect()

    const collection: Collection<ChannelSettings> = mongoClient.db("Cooldowns").collection("Users")
    collection.deleteMany({})
    client.channels.cache.forEach(channel => {

        console.log({ ChannelId: channel.id, Prefixes: ['m!', 'mk!'], Language: 'en-US'})
    if(channel.type == 'text' || channel.type == 'dm'  || channel.type == 'news' || channel.type == 'group')
        collection.insertOne({ ChannelId: channel.id, Prefixes: ['m!', 'mk!'], Language: 'en-US'})
    })
}
*/ 
