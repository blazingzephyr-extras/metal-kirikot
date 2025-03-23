import { MongoClient } from "mongodb";

//
//mongodb+srv://MongoKirikot_3000:<password>@metalkirikot.ql0cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


//

const uri: string = "";
const client: MongoClient = new MongoClient(uri, { keepAlive: true, autoReconnect: true });

client.connect((one, two) => {

    console.log(one)
    console.log(two)
})

//EventHandler.Initialize(MetalKirikot)
//CommandHandler.Load()