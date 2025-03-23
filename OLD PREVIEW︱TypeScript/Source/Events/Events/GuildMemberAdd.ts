import { GuildMember } from 'discord.js'
import { ClientEvent } from '../Core/ClientEvent'

export declare let event: ClientEvent
event = {
     
    Event: 'guildMemberAdd',
    Function: (member: GuildMember) => console.log(member.user.username)
}