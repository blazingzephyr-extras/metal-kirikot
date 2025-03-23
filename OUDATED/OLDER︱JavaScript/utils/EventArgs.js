const { Message, Client } = require("discord.js")

class CommandArgs
{
    message = new Message();
    client = new Client();

    get args()
    {
        return this.message.content.split(" ").slice(1)
    }
    get text
    {
        return 0
    }    
}

module.exports = CommandArgs