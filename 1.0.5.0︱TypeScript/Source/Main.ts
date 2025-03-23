import { Client } from "discord.js";

export { client }

const client = new Client({

    disableMentions: 'none',
    fetchAllMembers: true
})



/*
import * as fs from 'fs'
import { MK_Command } from './Core/Commands/Commands'
import { DatabaseHandler } from './Core/Database/DatabaseHandler'
import { Config } from './Core/Utility/Config'

Main()

async function Main() {

    Config.Load()
    await DatabaseHandler.Connect()

    /*let file = readFileSync(`F:\\Projects\\Metal Kirikot [1.0.5]\\Compiled\\parser.js`, 'utf-8')*/
    const forAWhile = await DatabaseHandler.Test.findOne({})
    const path = `${__dirname}/cmd.js`

    fs.writeFileSync(path, forAWhile.command)
    const e: MK_Command = await import(path)
    fs.unlinkSync(path)
    
    console.log(e)
}
