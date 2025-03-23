let permissions = [
    [
        //Gem Dust - Default Person
        'VIEW_CHANNEL',
        'SEND_MESSAGES',        
        'READ_MESSAGE_HISTORY', 
        'CONNECT',
        'SPEAK',
        'USE_VAD'
    ],
    [
        //Soil League - level 0
    ],
    [
        //Wooden League - Level 5
        'EMBED_LINKS',
        'ATTACH_FILES',
        'USE_EXTERNAL_EMOJIS',
        'ADD_REACTIONS'
    ],
    [
        //Brick League - Level 15
        'CHANGE_NICKNAME',
        'CREATE_INSTANT_INVITE'
        //Allows you to take part in events
    ],
    [
        //Iron League - Level 25
        'STREAM'
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
        'PRIORITY_SPEAKER'
        //Gives access to V.I.P chat
    ],
    [
        //Gem Peasant - Trial Helper
        'MANAGE_NICKNAMES',
        'MOVE_MEMBERS'
        //Requires to be in Brick League
    ],
    [
        //Diamond Peasant - Helper
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS'
    ],
    [
        //Gem Diamond - Trial Moderator
        'MANAGE_ROLES',
        'MANAGE_MESSAGES',
        'KICK_MEMBERS',
        //Requires to be in Iron League
    ],
    [
        //Diamond Knight - Moderator
        'VIEW_AUDIT_LOG',
        'BAN_MEMBERS',
        'SEND_TTS_MESSAGES'
    ],
    [
        //Gem King - Trial Administrator
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'  
        //Requires to be in Silver League
    ],
    [
        //Diamond King - Administrator
        'MANAGE_GUILD',
        'MANAGE_CHANNELS'
    ],
    [
        //Diamond Emperor - Co-Owner/Head Admin 
        'ADMINISTRATOR'
    ]
]

let names = [
    '💎Gem Dust💎',
    '🌱Soil League🌱',
    '🌳Wooden League🌳',
    '🧱Brick League🧱',
    '⚙️Iron League⚙️',
    '🥉Bronze League🥉',
    '🥈Silver League🥈',
    '🥇Golden League🥇',
    '💿Platinum League💿',
    '💎Gem Peasant💎',
    '💎Diamond Peasant💎',
    '💎Gem Knight💎',
    '💎Diamond Knight💎',
    '💎Gem King💎',
    '💎Diamond King💎',
    '💎Diamond Emperor💎'
]

const Client = require("discord.js").Client
const MetalKirikot = new Client()

const readFileSync = require("fs").readFileSync

MetalKirikot.on("ready", () => {
    let roles = JSON.parse(readFileSync("colors.json"))
    let guild = MetalKirikot.guilds.cache.find(gld => gld.id == "638039933457793025")
    guild.members.cache.array()[0].joinedAt
    console.log(guild.name)
    //for(var role in roles)
    //guild.roles.create({data: {name: role.name, color: role.rgb_hex}})
        


    /*names.forEach((name, i) => {
        let perms = []
        for(let j = 0; j < i+1; j++) {
            perms = permissions[j].concat(perms)
        }
        console.log(perms)
        console.log(name)
        guild.roles.cache.find(role => role.name == name).setPermissions(perms)
    })*/
    
    /*let roles = []

    guild.roles.cache.forEach(role => {
        if(role.hexColor != "#000000")
        roles.push({ name: role.name, color: role.hexColor.toUpperCase() })
    })
    FS.writeFileSync("roles.json", JSON.stringify(roles), { encoding: "utf-8" })
    */
    //for(let i = 1; i < permissions.length; i++)
    //{
        /*let perms = []
        let role = guild.roles.cache.find(role => role.name == names[i])
        for(let j = 0; j < i; j++) {
            perms = permissions[j].concat(perms)
        }*/
        /*console.log(role.name)
        console.log(role.permissions.serialize(false))
        role.setPermissions(perms)
        console.log(role.permissions.serialize(false))*/
    //}
    /*roles.forEach(role => {
        console.log(role.label)
    })*/
    /*guild.roles.cache.forEach(role => {
        if(role.hexColor != "#000000")
        try { role.delete() }
        catch { }
    })*/
    /*for(let i = 0; i < roles.length; i++) {
        let role = roles[i].split("#");
        guild.roles.create({ data: { name: role[0], color: role[1] }, reason: "Adding color roles!" })
    }*/
})

MetalKirikot.login("<token>")