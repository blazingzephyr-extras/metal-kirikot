import { Message } from 'discord.js'
import { readdirSync } from 'fs'
import { CommandContext } from './ComamndContext';
import { Command } from './Command'
import { CommandResult } from './CommandResult';

export class CommandHandler {

    private static _commands: Command[] = []

    public static Load() : void {

        const path: string = `${__dirname}/../Commands/`;
        const files: string[] = readdirSync(path);
        for (var i in files)
        
            import (`${path}/${files[i]}`)
                .then(module => this._commands[i] = module.command)
    }

    public static Run(message: Message) : void {

        const content: string[] = message.content.split(' ')

        if(content[0].startsWith('m!')) {

            const commandUsage: string = content[0].replace('m!', '')
            const command: Command = this._commands.find(predicate => predicate.Usage.includes(commandUsage))
    
            if(command) {
    
                const commandContext: CommandContext = { 
                    Client: null, 
                    Message: message, 
                    User: message.author, 
                    Channel: message.channel, 
                    Guild: message.guild,
                    Member: message.member,
                    Attachments: message.attachments.array(),
                    Args: content.slice(1)
                }
        
                const result: CommandResult = command.Execute(commandContext);
                const send = result.SendMessage()
                if(send)
                    message.channel.send(result.Value)
            }
        }
    }
}