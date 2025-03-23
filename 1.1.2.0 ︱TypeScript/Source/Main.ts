
import { Client } from 'discord.js'
import * as Config  from '../Assets/Configuration.json'
export { Config, client }

const client: Client = new Client();
client.login(Config.Token);