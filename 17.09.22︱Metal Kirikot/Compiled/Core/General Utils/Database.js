"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const Config_1 = require("./Config");
const ApplicationStatus_1 = require("./ApplicationStatus");
class Database {
    static async Connect() {
        this._mongoClient = new mongodb_1.MongoClient(Config_1.Config.ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await this._mongoClient.connect();
            const db = this._mongoClient.db('Cooldowns');
            this.Global = db.collection('Global');
            this.Guild = db.collection('Guild');
            this.Channel = db.collection('Channel');
            this.User = db.collection('User');
        }
        catch (error) {
            ApplicationStatus_1.ApplicationStatus.Database = error;
        }
    }
    static async AddGuild(settings) {
        this._mongoClient.db('GuildSettings').collection('GuildSettings').insertOne(settings);
    }
    static async RemoveGuild(id) {
        this._mongoClient.db('GuildSettings').collection('GuildSettings').deleteOne({ "GuildId": id });
    }
    static async FetchGuilds(client) {
        const guildSettingsCollection = this._mongoClient.db('GuildSettings').collection('GuildSettings');
        const guilds = client.guilds.cache.array();
        for (let i in guilds) {
            const guildSettings = await guildSettingsCollection.findOne({ "GuildId": guilds[i].id });
            this.GuildSettings[guildSettings.GuildId] = guildSettings;
        }
    }
    static async Disconnect() {
        await this._mongoClient.close(true);
    }
}
exports.Database = Database;
Database.GuildSettings = {};
