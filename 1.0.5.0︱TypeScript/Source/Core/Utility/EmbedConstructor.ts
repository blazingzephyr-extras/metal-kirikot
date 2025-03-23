import { Guild, MessageEmbed } from 'discord.js';
import { Config } from './Config';
import { client } from '../../Main';

export { EmbedConstructor }

class EmbedConstructor {

    public static ConstructEmbed(embedProperties: { Text: { [key: string]: any }, Guild: Guild }, header: string, body: string, color: string) : MessageEmbed {

        const embed: MessageEmbed = new MessageEmbed({
    
            title: header,
            description: body,
            color: color,
            timestamp: new Date().getTime(),
            author: { 
                name: embedProperties.Text['bot_created_by'].replace('{owner}', '@' + Config.Owner.tag),
                iconURL: Config.Owner.avatarURL(),
                url: Config.ServerLink
            },
            footer: embedProperties.Guild ? 
                {
                    text: `${embedProperties.Guild.name}  ┃  ${embedProperties.Guild.me.displayName}`,
                    iconURL: embedProperties.Guild.iconURL()
                } : 
                {
                    text: client.user.username, 
                    iconURL: client.user.avatarURL()
                }
        })
    
        return embed
    }
}