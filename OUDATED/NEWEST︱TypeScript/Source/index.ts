///<reference path='../node_modules/discord.js/typings/index.d.ts'/>
import { ShardingManager } from 'discord.js'

const manager: ShardingManager = new ShardingManager('./main.js', {
    token: '<token>',
    totalShards: 1,
    respawn: true
})
manager.on('shardCreate', shard => { console.log(`Sucessfully launched shard with '${shard.id}' ID!`) })
manager.spawn()