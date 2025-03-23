
import { writeFileSync } from 'fs';
import { MongoClient } from 'mongodb'
import { Config } from '../../Main';
import { MK_Command } from '../Commands/Commands';
import { Dictionary } from '../Utility/Dictionary';
import { CooldownEntry } from './CooldownEntry';
import { GuildSettings } from './GuildSettings';

class DatabaseHandler {

    public static CommandCooldowns: CooldownEntry[];
    public static GuildSettings: Dictionary<GuildSettings>;
    private static _mongoClient: MongoClient;

    public static async Connect() {

        console.log("⏳ Connecting to the database...")

        this._mongoClient = new MongoClient(Config.DatabaseConnection, { useNewUrlParser: true, useUnifiedTopology: true });
        const connect = await this._mongoClient.connect();
        if(connect == null)
            return console.log("❌ Error connecting to the database!");
            
        this.CommandCooldowns = await this._mongoClient.db("CommandCooldowns").collection<CooldownEntry>("CommandCooldowns").find().toArray();
        const guildSettings = await this._mongoClient.db("GuildSettings").collection("CommandCooldowns").find().toArray();
        for (const i in guildSettings) {

            const item = guildSettings[i];
            const id = item.Id;
            const customCommands: MK_Command[] = [];
            const commandsData: string[] = item.CustomCommands;
            for (const i in commandsData) {

                const commandData = commandsData[i];
                const path = `${__dirname}/../../../DownloadableAssets/${i}.ts`;
                writeFileSync(path, commandData, 'w');

                const customCommand: { command: MK_Command} = await import(path);
                customCommands.push(customCommand.command);
            }

            const settings = { 
                Id: id, 
                Settings: item.Settings, 
                ChannelOverwrites: item.ChannelOverwrites, 
                CustomCommands: customCommands,
                _CommandData: item.CustomCommandData
            };
            this.GuildSettings[id] = settings;
        }

        return console.log("✅ Successfully connected to the database!");
    }

    public static async Disconnect() {

        console.log("⏳ Disconnecting from the database...");
        console.log("⏳ Saving command cooldowns...");
        const cooldowns = this._mongoClient.db("CommandCooldowns").collection<CooldownEntry>("CommandCooldowns");
        await cooldowns.deleteMany({ });
        await cooldowns.insertMany(this.CommandCooldowns);
        console.log("✅ Successfully saved all command cooldowns!");
        
        console.log("⏳ Saving cooldowns...");
        const guildSettings = this._mongoClient.db("GuildSettings").collection("GuildSettings");
        await guildSettings.deleteMany({ });
        for (const i in this.GuildSettings) {

            const settings = this.GuildSettings[i];
            const item = { 
                Id: settings.Id, 
                Settings: settings.Settings, 
                ChannelOverwrites: settings.ChannelOverwrites, 
                CustomCommands: settings._CommandData 
            };

            await guildSettings.insertOne(item);
        }
        console.log("✅ Successfully saved all guild settings!");

        await this._mongoClient.close();
        console.log("✅ Successfully disconnected from the database!");
    }
}