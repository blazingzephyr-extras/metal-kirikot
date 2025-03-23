"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./Core/Commands/CommandHandler");
const Database_Index_1 = require("./Core/Database/Database.Index");
const Events_Index_1 = require("./Core/Events/Events.Index");
const Config_1 = require("./Core/Utility/Config");
const client = new discord_js_1.Client({
    disableMentions: 'none',
    fetchAllMembers: true
});
exports.client = client;
LaunchClient();
async function LaunchClient() {
    Config_1.Config.Load();
    await Database_Index_1.Database.Connect();
    await Events_Index_1.EventHandler.InitializeFor(client);
    await CommandHandler_1.CommandHandler.Load();
    await client.login(Config_1.Config.Token);
}
