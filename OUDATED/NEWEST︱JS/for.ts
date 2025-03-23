import {Client, TextChannel} from "discord.js";
const MetalKirikot = new Client()

let permissions = [
    [
        //Soil League - level 0
        'VIEW_CHANNEL',  
        'SEND_MESSAGES',        
        'READ_MESSAGE_HISTORY', 
        'CONNECT',
        'SPEAK',
        'USE_VAD'
    ],
    [
        //Wooden League - Level 5
        'EMBED_LINKS',
        'ATTACH_FILES',
        'EXTERNAL_EMOJIS',
        'USE_EXTERNAL_EMOJIS'
    ],
    [
        //Brick League - Level 15
        'CHANGE_NICKNAME',
        'CREATE_INSTANT_INVITE',
        'ADD_REACTIONS'
        //You can be part of events after this
    ],
    [
        //Iron League - Level 25
        'STREAM'
        //Access to some important polls (different from others)
    ],
    [
        //Bronze League - Level 35
    ],
    [
        //Silver league - Level 50
    ],
    [
        //Gold League - Level 75
    ],
    [
        //Platinum League - Level 100
        'SEND_TTS_MESSAGES',
        'PRIORITY_SPEAKER',
        //Gives access to V.I.P chat
    ],
    [
        //Diamond Peasant - Helper'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'MANAGE_NICKNAMES',
        'KICK_MEMBERS',
        'VIEW_AUDIT_LOG',
    ],
    [
        //Diamond Knight - Moderator
        'BAN_MEMBERS',
        'MANAGE_EMOJIS',
        'MANAGE_WEBHOOKS',
        'MANAGE_MESSAGES'
    ],
    [
        //Diamond King - Admin
        'MANAGE_CHANNELS',    
        'MANAGE_GUILD',
        'MANAGE_ROLES'
    ],
    [
        //Diamond Emperor - Co-owner/Head Admin 
        //Doesn't get any new permissions, but rules over the server
    ]
]

MetalKirikot.on("ready", () => {
    let guild = MetalKirikot.guilds.cache.find(gld => gld.id == "732877244438937643")
    let channel = guild.channels.cache.find(channel => channel.name == "📃ideas📃") as TextChannel
    let messages = channel.messages.cache.toJSON()
    console.log(messages)
    /*let perms = []
    for(let i = 0; i < 12; i++)
    {
        perms = []
        for(let j = 0; j < i; j++)
            perms = permissions[j].concat(perms);
        guild.roles.create({ data: { permissions: perms, name: `${i}`, mentionable: false }, reason: `Make role ${i}`});
    }*/
    //let guild = MetalKirikot.guilds.find("ownerID", "448836861155213312")
    //guild.createRole({permissions: []}, "Need to maker roles for update")

    //changeColor(role, paradise);
    /*var emoji = new Emoji(null);
emoji.setName("noob");
emoji.animated = true;
emoji.requiresColons = true;
emoji.managed = false;
emoji.id = emoji.createdTimestamp();
emoji.deletable = true;*/
})
//require("F:/Metal Kirikot/utils/CommandHandler")(MetalKirikot)

MetalKirikot.login("<token>");