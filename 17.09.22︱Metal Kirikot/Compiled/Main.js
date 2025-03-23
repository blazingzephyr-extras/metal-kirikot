"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
main();
function main() {
    const client = new discord_js_1.Client({ intents: ["GUILDS", "GUILD_WEBHOOKS"] });
    const token = "";
    client.login(token).then(async () => {
        const a = await client.generateInvite({ permissions: ['ADMINISTRATOR'] });
        console.log(a);
        /*
        console.log(.)
        const guild = client.guilds.resolve("983007002454282270");
        const channel = guild.channels.cache.find(c => c.name == "💬┃lonely-chat")
        
        console.log(channel);

        const ck = channel as TextChannel;
        ck.createWebhook("TEST").then(
            webhook =>
            {
                const cl = new WebhookClient(webhook.id, webhook.token, {});
                cl.send("IDK TEST IG");
            }
        )
        */
    });
}
//client.generateInvite({ disableGuildSelect: false }).then(i => console.log(i))
/*Config.Initialize()
EventHandler.Initialize(client)*/
/*Database.Connect().then(() => {

    CommandHandler.Load()

    const token = Config.Tokens.Alpha
    client.login(token)
})*/ 
