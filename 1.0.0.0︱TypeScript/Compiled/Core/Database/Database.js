"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const Config_1 = require("../Utility/Config");
class Database {
    static async Connect() {
        this._mongoClient = new mongodb_1.MongoClient(Config_1.Config.DatabaseConnection, { useNewUrlParser: true, useUnifiedTopology: true });
        await this._mongoClient.connect();
        const cooldowns = this._mongoClient.db("Cooldowns");
        this.Global = cooldowns.collection("Global");
        this.Guilds = cooldowns.collection("Guilds");
        this.Channels = cooldowns.collection("Channels");
        this.Users = cooldowns.collection("Users");
        const settings = this._mongoClient.db("Settings");
        this.ChannelSettings = settings.collection("ChannelSettings");
    }
    static AddChannel(id) {
        this.ChannelSettings.insertOne({ 'ChannelId': id, 'Prefixes': Config_1.Config.Prefixes, 'Language': 'en-US' });
    }
    static DeleteChannel(id) {
        this.ChannelSettings.deleteOne({ 'ChannelId': id, 'Prefixes': Config_1.Config.Prefixes, 'Language': 'en-US' });
    }
    static async Disconnect() {
        await this._mongoClient.close();
    }
}
exports.Database = Database;
