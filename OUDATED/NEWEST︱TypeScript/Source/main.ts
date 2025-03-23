import { readdirSync } from 'fs'
import { Client } from 'discord.js'
import { Command } from './Utilities/Command';
export const MetalKirikot: Client = new Client();
let Commands: Command[];



MetalKirikot.on('ready', () => {
    ImportModules('Commands', Commands);
    console.log(Commands)
})

MetalKirikot.login('<token>');