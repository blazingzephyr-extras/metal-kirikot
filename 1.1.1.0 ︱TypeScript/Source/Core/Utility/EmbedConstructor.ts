
import { Guild, MessageEmbed } from 'discord.js';
import { Config, client } from '../../Main';
import { owner } from '../../Events/Ready';
import { Dictionary } from './Dictionary';
export { ConstructEmbed }

function ConstructEmbed(langya, guild: Guild, header: string, body: string, color: string) : MessageEmbed {

    const embed: MessageEmbed = new MessageEmbed({
    
        title: header,
        description: body,
        color: color,
        timestamp: new Date().getTime(),
        author: {
            name: text['Bot_created_by'].replace('{owner}', owner.tag),
            iconURL: owner.avatarURL(),
            url: Config["Server"]
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