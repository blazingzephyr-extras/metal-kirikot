import { Client, User } from "discord.js"
import { readFileSync, readdirSync } from "fs"
import { Dictionary } from "./Dictionary"

export { Config }

class Config {

    public static Token: string
    public static ConnectionString: string
    public static Owner: User
    public static BetaTesters: User[] = []
    public static Prefixes: string[]
    public static Language: string
    public static Colors: { [color: string]: string }
    public static ServerLink: string
    public static BotStrings: { [language: string]: Dictionary<any> } = {}
    private static _configuration: string

    public static Initialize() {

        const file = readFileSync(`${__dirname}\\..\\..\\Configuration.jsonc`, "utf-8")
        this._configuration = JSON.parse(file)

        this.Token = this._configuration["Token"]
        this.ConnectionString = this._configuration["ConnectionString"]
    }

    public static FetchVia(client: Client) {

        this.Prefixes = this._configuration["Prefixes"]
        this.Language = this._configuration["Language"]
        this.Colors = this._configuration["Colors"]
        this.ServerLink = this._configuration["ServerLink"]

        const files: string[] = readdirSync(`${__dirname}\\..\\..\\Assets\\Text`)
        for(let i in files) {

            const file: string = readFileSync(`${__dirname}\\..\\..\\Assets\\Text\\${files[i]}`, "utf8")
            const language: string = files[i].substring(0, 5)
            const json: Dictionary<any> = JSON.parse(file)
            this.BotStrings[language] = json
        }

        const ownerId = this._configuration["Owner"]
        const betaTesters = this._configuration["BetaTesters"]

        this.Owner = client.users.cache.get(ownerId)
        for(let i in betaTesters)
            this.BetaTesters[i] = client.users.cache.get(betaTesters[i])
    }
}