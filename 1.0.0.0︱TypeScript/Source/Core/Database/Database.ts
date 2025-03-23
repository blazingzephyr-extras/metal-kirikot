import { Collection, Db, MongoClient } from 'mongodb'
import { Config } from '../Utility/Config'
import { CooldownEntry, SpecifiedEntry, ChannelSettings } from './Database.Index'

export { Database }

class Database {

    public static Global: Collection<CooldownEntry>
    public static Guilds: Collection<SpecifiedEntry>
    public static Channels: Collection<SpecifiedEntry>
    public static Users: Collection<SpecifiedEntry>
    public static ChannelSettings: Collection<ChannelSettings>
    private static _mongoClient: MongoClient

    public static async Connect() {

        this._mongoClient = new MongoClient(Config.DatabaseConnection, { useNewUrlParser: true, useUnifiedTopology: true })
        await this._mongoClient.connect()

        const cooldowns: Db = this._mongoClient.db("Cooldowns")
        this.Global = cooldowns.collection("Global")
        this.Guilds = cooldowns.collection("Guilds")
        this.Channels = cooldowns.collection("Channels")
        this.Users = cooldowns.collection("Users")
        
        const settings = this._mongoClient.db("Settings")
        this.ChannelSettings = settings.collection("ChannelSettings")
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