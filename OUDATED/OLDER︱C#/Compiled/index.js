"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
var Config = JSON.parse(fs_1.readFileSync("./config.json", { encoding: "utf-8" }));
var manager = new discord_js_1.ShardingManager("./Compiled/main.js", {
    token: Config.token,
    totalShards: 1,
    respawn: true
});
manager.spawn();
manager.on('shardCreate', function (shard) {
    console.log("Sucessfully launched shard with \"" + shard.id + "\" ID!");
});
