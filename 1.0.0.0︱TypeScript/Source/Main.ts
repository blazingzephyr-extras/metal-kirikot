import { Client, Message } from 'discord.js'
import { CommandHandler } from './Core/Commands/CommandHandler'
import { Database } from './Core/Database/Database.Index'
import { EventHandler } from './Core/Events/Events.Index'
import { Config } from './Core/Utility/Config'

export { client }

const client: Client = new Client({ 

    disableMentions: 'none',
    fetchAllMembers: true
})

LaunchClient()

async function LaunchClient() {

    Config.Load()
    await Database.Connect()
    await EventHandler.InitializeFor(client)
    await CommandHandler.Load()

    await client.login(Config.Token)
}