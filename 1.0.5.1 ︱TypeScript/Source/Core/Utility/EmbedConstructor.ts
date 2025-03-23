import { Guild, MessageEmbed } from "discord.js";
import { Config } from "../../../../Metal Kirikot [1.0.5] Beta 2/Source/Core/Utility/Config";
import { client } from "../../../../Metal Kirikot [1.0.5] Beta 2/Source/Main";
import { Dictionary } from "../../../../Metal Kirikot [1.0.5] Beta 2/Source/Core/Utility/Dictionary";

export { EmbedConstructor }

class EmbedConstructor {

    public static ConstructEmbed(text: Dictionary<any>, guild: Guild, header: string, body: string, color: string) : MessageEmbed {

        const embed: MessageEmbed = new MessageEmbed({
    
            title: header,
            description: body,
            color: color,
            timestamp: new Date().getTime(),
            author: {
                name: text["Bot_created_by"].replace("{owner}", Config.Owner.tag),
                iconURL: Config.Owner.avatarURL(),
                url: Config.ServerLink
            },
            footer: guild ? 
                {
                    text: `${guild.name}  ┃  ${guild.me.displayName}`,
                    iconURL: guild.iconURL()
                } : 
                {
                    text: client.user.username, 
                    iconURL: client.user.avatarURL()
                }
        });
    
        return embed
    }
}