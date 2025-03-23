import { BotEvent } from '../Core/Events/Events.Index'
import { Config } from '../Core/Utility/Config'
import { client } from '../Main'

export { event }

const event: BotEvent = {

    Event: 'ready',
    Execute: () => {

        Config.FetchVia(client)
        client.user.setPresence({
            activity: {
                name: 'version 1.0.0! 😸🔧',
                type: 'PLAYING',
                url: Config.Server
            }
        })
        
        console.log(`✅ Launched bot as ${client.user.tag}!`)
    }
}