import { Database } from "../Core/Database/DatabaseHandler"
import { MK_Event } from "../Core/Events/Events"
import { Config } from "../Core/Utility/Config"
import { client } from "../Main"

export { event }

const event: MK_Event = {

    EventType: "ready",
    Execute: async () => {

        Config.FetchVia(client)
        await Database.FetchVia(client)

        client.user.setPresence({
            activity: {
                type: "PLAYING",
                name: "beta build of 1.1.0! 😸🔧",
                url: Config.ServerLink
            }
        })
        
        console.log(`✅ Launched bot as ${client.user.tag}!`)
    }
}