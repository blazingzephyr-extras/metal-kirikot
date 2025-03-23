import { Collection, Db, MongoClient } from 'mongodb'
import { MK_Command } from '../Commands/MK_Command'
import { Config } from '../Utility/Config'
import { Entry, TargetedEntry, GuildSettings, ChannelSettings } from './Database'

export { DatabaseHandler }

class DatabaseHandler {

    public static CC_Global: Collection<Entry>
    public static CC_Guilds: Collection<TargetedEntry>
    public static CC_Channels: Collection<TargetedEntry>
    public static CC_Users: Collection<TargetedEntry>
    public static Test: Collection
    public static GuildSettings: Collection<GuildSettings>
    public static ChannelSettings: Collection<ChannelSettings>
    private static _mongoClient: MongoClient

    public static async Connect() {

        this._mongoClient = new MongoClient(Config.DatabaseConnection, { useNewUrlParser: true, useUnifiedTopology: true })
        await this._mongoClient.connect()

        const cooldowns: Db = this._mongoClient.db("Cooldowns")
        const guild: Db = this._mongoClient.db("668807021260439553")
        //const settings = this._mongoClient.db("Settings")
        
        this.CC_Global = cooldowns.collection("Global")
        this.CC_Guilds = cooldowns.collection("Guilds")
        this.CC_Channels = cooldowns.collection("Channels")
        this.CC_Users = cooldowns.collection("Users")
        this.Test = guild.collection("CustomCommands") 
        /*this.GuildSettings = settings.collection("GuildSettings")
        this.ChannelSettings = settings.collection("ChannelSettings")*/

        console.log('✅ Successfully connected to database!')
    }

    public static AddChannel(id: string) {

        this.ChannelSettings.insertOne({ 'ChannelId': id, 'Prefixes': Config.Prefixes, 'Language': 'en-US' })
    }

    public static DeleteChannel(id: string) {

        this.ChannelSettings.deleteOne({ 'ChannelId': id })
    }

    public static async Disconnect() {

        await this._mongoClient.close()
    }
}