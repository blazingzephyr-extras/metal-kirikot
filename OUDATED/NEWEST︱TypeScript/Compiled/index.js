"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='../node_modules/discord.js/typings/index.d.ts'/>
var discord_js_1 = require("discord.js");
var manager = new discord_js_1.ShardingManager('./main.js', {
    token: '<token>',
    totalShards: 1,
    respawn: true
});
manager.on('shardCreate', function (shard) { console.log("Sucessfully launched shard with '" + shard.id + "' ID!"); });
manager.spawn();
