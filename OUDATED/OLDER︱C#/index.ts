
import { ShardingManager, Shard } from 'discord.js';
import { readFileSync } from 'fs';
const Config = JSON.parse(readFileSync("./config.json", { encoding: "utf-8" }))

const manager: ShardingManager = new ShardingManager("./Compiled/main.js", {
    token: Config.token,
    totalShards: 1,
    respawn: true
});
manager.spawn()
manager.on('shardCreate', shard => {
    console.log(`Sucessfully launched shard with "${shard.id}" ID!`);
});