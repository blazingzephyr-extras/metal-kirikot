module.exports = {
    module: "ban",
    usage: ["help", "h"],
    cooldown: 0,
    guildOnly: false,
    beta: false,

    run(F, Data, Client, Config, TXT, message, args)
    {
        message.channel.send("Unfinished command. List of current commands:\nascii\navatar\nban\ntempban\nchannelInfo\nkick\nmute\ntempmute\nserverInfo\nkick\nship\nserverList\nmodList\nunban (finsihed except for log embed)", {
            code: "yaml"
        })
    }
}