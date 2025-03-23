import { Client, User } from "discord.js";
import { readFileSync } from "fs";

export { Config }

class Config {

    public static Owner: User
    public static ServerLink: string
    public static ConnectionString: string
    public static DefaultPrefixes: string[]
    public static Tokens: { Alpha: string, Omega: string }
    public static BetaTesters: User[] = []
    public static Colors: { [color: string]: string }

    private static OwnerId: string
    private static BetaTestersIds: string[]

    public static Initialize () {

        const configuration: string = readFileSync(`${__dirname}/../../../Config.json`, { encoding: 'utf-8', flag: 'r' })
        const json = JSON.parse(configuration)
        
        this.OwnerId = json['Owner']
        this.BetaTestersIds = json['BetaTesters']
        this.ServerLink = json['ServerLink']
        this.ConnectionString = json['ConnectionString']
        this.DefaultPrefixes = json['DefaultPrefixes']
        this.Tokens = json['Tokens']
        this.Colors = json['Colors']
    }

    public static FinishInitializing(client: Client) {
  
        this.Owner = client.users.cache.get(this.OwnerId)
        for (var i in this.BetaTestersIds)
            this.BetaTesters[i] = client.users.cache.get(this.BetaTestersIds[i])
    }
}