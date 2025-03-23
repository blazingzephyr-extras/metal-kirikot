
import { Client } from 'discord.js'
import * as Config  from '../Assets/Configuration.json'
import * as en_US  from '../Assets/en-US.json'
import * as ru_RU  from '../Assets/ru-RU.json'
export { Config, languages, client }

const languages = { "en-US": en_US, "ru-RU": ru_RU }
const client: Client = new Client()

client.login(Config.Token);