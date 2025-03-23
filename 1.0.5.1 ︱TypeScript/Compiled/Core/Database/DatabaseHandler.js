"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const Config_1 = require("../Utility/Config");
class Database {
    static async FetchVia(client) {
        console.log("⏳ Connecting to the database...");
        this._mongoClient = new mongodb_1.MongoClient(Config_1.Config.ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const connect = await this._mongoClient.connect();
        if (connect == null)
            return console.log("❌ Error connecting to the database!");
        const cooldowns = this._mongoClient.db("Cooldowns");
        this.CC_Global = cooldowns.collection("Global");
        this.CC_Guilds = cooldowns.collection("Guilds");
        this.CC_Channels = cooldowns.collection("Channels");
        this.CC_Users = cooldowns.collection("Users");
        const dms = this._mongoClient.db("DMs");
        this.DMOverwrites = dms.collection("ChannelOverwrites");
        const guilds = client.guilds.cache.array();
        for (let i in guilds) {
            const id = guilds[i].id;
            const guild = this._mongoClient.db(id);
            const settings = guild.collection("Settings");
            const channelOverwrites = guild.collection("ChannelOverwrites");
            const customCommands = guild.collection("CustomCommands");
            const customEvents = guild.collection("CustomEvents");
            this.GuildSettings[id] = {
                Settings: settings,
                ChannelOverwrites: channelOverwrites,
                CustomCommands: customCommands,
                CustomEvents: customEvents
            };
        }
        return console.log("✅ Successfully connected to the database!");
    }
    static async Disconnect() {
        console.log("⏳ Disconnecting from the database...");
        await this._mongoClient.close();
        console.log("✅ Successfully disconnected from the database!");
    }
    static async AddGuild(id) {
        const guild = this._mongoClient.db(id);
        const settings = await guild.createCollection("Settings");
        const channelOverwrites = await guild.createCollection("ChannelOverwrites");
        const customCommands = await guild.createCollection("CustomCommands");
        const customEvents = await guild.createCollection("CustomEvents");
        settings.insertOne({ Prefixes: Config_1.Config.Prefixes, Language: Config_1.Config.Language });
        this.GuildSettings[id] = {
            Settings: settings,
            ChannelOverwrites: channelOverwrites,
            CustomCommands: customCommands,
            CustomEvents: customEvents
        };
    }
    static RemoveGuild(id) {
        const database = this._mongoClient.db(id);
        database.dropDatabase();
        this.GuildSettings[id] = undefined;
    }
}
exports.Database = Database;
Database.GuildSettings = {};
