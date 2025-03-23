import { Client } from "discord.js"
import { Collection, MongoClient } from "mongodb"
import { Config } from "../Utility/Config";
import { CC_Entry, CC_TargetedEntry } from "./CC_Entry"
import { ChannelOverwrite } from "./ChannelOverwrite"
import { CustomCommand } from "./CustomCommand";
import { CustomEvent } from "./CustomEvent";
import { GuildSettings } from "./GuildSettings";

export { Database }

type Guild = {

    [id: string]: {

        Settings: Collection<GuildSettings>,
        ChannelOverwrites: Collection<ChannelOverwrite>,
        CustomCommands: Collection<CustomCommand>,
        CustomEvents: Collection<CustomEvent>
    };
};

class Database {

    public static CC_Global: Collection<CC_Entry>
    public static CC_Guilds: Collection<CC_TargetedEntry>
    public static CC_Channels: Collection<CC_TargetedEntry>
    public static CC_Users: Collection<CC_TargetedEntry>
    public static DMOverwrites: Collection<ChannelOverwrite>
    public static GuildSettings: Guild = {}
    private static _mongoClient: MongoClient

    public static async FetchVia(client: Client) {

        console.log("⏳ Connecting to the database...")

        this._mongoClient = new MongoClient(Config.ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const connect = await this._mongoClient.connect();
        if(connect == null)
            return console.log("❌ Error connecting to the database!");

        const cooldowns = this._mongoClient.db("Cooldowns")            
        this.CC_Global = cooldowns.collection("Global")
        this.CC_Guilds = cooldowns.collection("Guilds")
        this.CC_Channels = cooldowns.collection("Channels")
        this.CC_Users = cooldowns.collection("Users")

        const dms = this._mongoClient.db("DMs")
        this.DMOverwrites = dms.collection("ChannelOverwrites")

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

        return console.log("✅ Successfully connected to the database!")
    }

    public static async Disconnect() {

        console.log("⏳ Disconnecting from the database...")

        await this._mongoClient.close()
        console.log("✅ Successfully disconnected from the database!")
    }

    public static async AddGuild(id: string) {

        const guild = this._mongoClient.db(id);
        const settings = await guild.createCollection("Settings");
        const channelOverwrites = await guild.createCollection("ChannelOverwrites");
        const customCommands = await guild.createCollection("CustomCommands");
        const customEvents = await guild.createCollection("CustomEvents");

        settings.insertOne({ Prefixes: Config.Prefixes, Language: Config.Language });
        this.GuildSettings[id] = { 

            Settings: settings, 
            ChannelOverwrites: channelOverwrites, 
            CustomCommands: customCommands, 
            CustomEvents: customEvents 
        };
    }

    public static RemoveGuild(id: string) {

        const database = this._mongoClient.db(id);
        database.dropDatabase();

        this.GuildSettings[id] = undefined
    }
}