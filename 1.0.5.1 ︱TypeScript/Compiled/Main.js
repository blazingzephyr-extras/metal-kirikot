"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./Core/Commands/CommandHandler");
const Config_1 = require("./Core/Utility/Config");
const client = new discord_js_1.Client();
exports.client = client;
Main();
async function Main() {
    Config_1.Config.Initialize();
    client.on('message', message => {
        if (message.content == "m!ping")
            message.channel.send(Date.now() - message.createdTimestamp);
    });
    await CommandHandler_1.CommandHandler.Load();
    //await EventHandler.LoadFor(client)
    await client.login(Config_1.Config.Token);
}
