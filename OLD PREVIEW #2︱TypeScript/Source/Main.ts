import { Client } from 'discord.js'
import { CommandHandler } from './Core/Commands/CommandHandler';
import { EventHandler } from './Core/Events/EventHandler';
import { Config } from './Core/General Utils/Config';
import { Database } from './Core/General Utils/Database';

export { client } 

const client: Client = new Client({

    disableMentions: 'none',
    fetchAllMembers: true
})

Config.Initialize()
EventHandler.Initialize(client)
Database.Connect().then(() => {

    CommandHandler.Load()

    const token = Config.Tokens.Alpha
    client.login(token)
})