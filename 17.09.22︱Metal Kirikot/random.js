const { Client, WebhookClient } = require("discord.js");
const client = new Client({ intents: [ "GUILDS", "GUILD_WEBHOOKS" ] })

const token = ""
client.login(token)

client.on("ready", () =>
{
    const guild = client.guilds.resolve("983007002454282270");

    console.log(guild.available);
    const channel = guild.channels.cache.find(c => c.name == "🐧┃the-funny︱no-context");

    channel.createWebhook("TEST").then(
        webhook => 
        {
            const cl = new WebhookClient(webhook.id, webhook.token, {});
            
            cl.once("apiRequest", req => {

                console.log("HA");
            })
            cl.send("IDK TEST IG");
        }
    )
})