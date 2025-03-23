import { Collection, Db, MongoClient } from 'mongodb'
import { Config } from './Config'
import { ApplicationStatus } from './ApplicationStatus'
import { GuildSettings } from './GuildSettings'
import { Client, Guild } from 'discord.js'
import { client } from '../../Main'
import { CommandCooldown, SpecifiedCooldown } from '../Commands/CommandHandler'

export { Database }

class Database {

    public static GuildSettings: { [ guildId: string]: GuildSettings } = {}
    public static Global: Collection<CommandCooldown>
    public static Guild: Collection<SpecifiedCooldown>
    public static Channel: Collection<SpecifiedCooldown>
    public static User: Collection<SpecifiedCooldown>
    public static _mongoClient: MongoClient

    public static async Connect() {
        
        this._mongoClient = new MongoClient(Config.ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        
        try {

            await this._mongoClient.connect()

            const db = this._mongoClient.db('Cooldowns')
            this.Global = db.collection('Global')
            this.Guild = db.collection('Guild')
            this.Channel = db.collection('Channel')
            this.User = db.collection('User')
        }

        catch (error: any) { 

            ApplicationStatus.Database = error 
        }
    }

    public static async AddGuild(settings: GuildSettings) {

        this._mongoClient.db('GuildSettings').collection('GuildSettings').insertOne(settings)
    }

    public static async RemoveGuild(id: string) {

        this._mongoClient.db('GuildSettings').collection('GuildSettings').deleteOne({ "GuildId": id })
    }

    public static async FetchGuilds(client: Client) {

        const guildSettingsCollection: Collection<GuildSettings> = this._mongoClient.db('GuildSettings').collection('GuildSettings')
        const guilds: Guild[] = client.guilds.cache.array()
        for(let i in guilds) {

            const guildSettings = await guildSettingsCollection.findOne({ "GuildId": guilds[i].id })
            this.GuildSettings[guildSettings.GuildId] = guildSettings
        }
    }

    public static async Disconnect() {

        await this._mongoClient.close(true)
    }
}