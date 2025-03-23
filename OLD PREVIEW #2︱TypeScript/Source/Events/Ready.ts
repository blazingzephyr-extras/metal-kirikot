import { ClientEvent } from "../Core/Events/ClientEvent"
import { Config } from "../Core/General Utils/Config"
import { Database } from "../Core/General Utils/Database"
import { client } from "../Main"

export { event }

const event: ClientEvent = {

    Event: 'ready',
    Execute: () => {

        console.log("ready?")
        client.generateInvite().then(link => console.log(link))
        Database.FetchGuilds(client)
        Config.FinishInitializing(client)
    }
}