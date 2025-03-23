"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./Core/Commands/CommandHandler");
const EventHandler_1 = require("./Core/Events/EventHandler");
const Config_1 = require("./Core/General Utils/Config");
const Database_1 = require("./Core/General Utils/Database");
const client = new discord_js_1.Client({
    disableMentions: 'none',
    fetchAllMembers: true
});
exports.client = client;
Config_1.Config.Initialize();
EventHandler_1.EventHandler.Initialize(client);
Database_1.Database.Connect().then(() => {
    CommandHandler_1.CommandHandler.Load();
    const token = Config_1.Config.Tokens.Alpha;
    client.login(token);
});
