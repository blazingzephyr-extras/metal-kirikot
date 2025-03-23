import { Client } from "discord.js";
import { CommandHandler } from "./Core/Commands/CommandHandler";
import { EventHandler } from "./Core/Events/Events";
import { Config } from "./Core/Utility/Config";

export { client }

const client: Client = new Client();
Main()

async function Main() {

    Config.Initialize()
    await CommandHandler.Load()
    await EventHandler.LoadFor(client)

    await client.login(Config.Token)
}