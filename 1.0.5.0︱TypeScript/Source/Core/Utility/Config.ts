import { Client, User } from 'discord.js'
import { readFileSync, readdirSync } from 'fs'

export { Config }

class Config {
    
    public static Token: string
    public static DatabaseConnection: string
    public static Owner: User
    public static BetaTesters: User[] = []
    public static Prefixes: string[]
    public static Colors: { [color: string]: string }
    public static ServerLink: string
    public static BotStrings: { [key: string]: any }
    private static _ownerId: string
    private static _betaTestersIds: string[] 

    public static Load() {

        const file: string = readFileSync(`${__dirname}/../../Configuration.json`, 'utf-8')
        console.log(file)
        const configuration = JSON.parse(file)

        this.Token = configuration['Token']
        this.DatabaseConnection = configuration['DatabaseConnection']
        this.Prefixes = configuration['Prefixes']
        this.Colors = configuration['Colors']
        this.ServerLink = configuration['ServerLink']
        this._ownerId = configuration['Owner']
        this._betaTestersIds = configuration['BetaTesters']
/*
        const textFiles: string[] = readdirSync(`${__dirname}/../../Assets/Languages/`)
        for(let i in textFiles) {

            const textFile: string = readFileSync(`${__dirname}/../../Assets/Languages/${textFiles[i]}`, { encoding: 'utf8', flag: 'r' })
            const language: string = textFiles[i].substring(0, 5)
            const json: { [key: string]: any } = JSON.parse(textFile)
            this.BotStrings[language] = json
        }*/
    }

    public static FetchVia(client: Client) {

        this.Owner = client.users.resolve(this._ownerId)
        for(let i in this._betaTestersIds)
            this.BetaTesters[i] = client.users.resolve(this._betaTestersIds[i])
    }
}