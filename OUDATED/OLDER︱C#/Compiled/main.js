"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var MetalKirikot = new discord_js_1.Client();
MetalKirikot.on("ready", function () {
    var guild = MetalKirikot.guilds.cache.find(function (gld) { return gld.id == "668807021260439553"; });
    var channel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(function (channel) { return channel.id == "737976579640262748"; });
    funct(channel)
});
function funct(channel) {
    channel.send("<@472184744814051330>")
    setTimeout(() => funct(channel), 1000)
}
MetalKirikot.login("<token>");
