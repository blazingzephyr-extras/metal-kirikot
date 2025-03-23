import { MessageEmbed } from "discord.js"

export class CommandResult {

    public Value: MessageEmbed
    private _sendMessage: boolean

    public SendMessage() : boolean {

        return this._sendMessage;
    }

    public static Error(errorName: string, errorMessage: string) : CommandResult { 

        return this.ConstructEmbed(errorName, errorMessage, "#FF2300") 
    }

    public static Warning(errorName: string, errorMessage: string) : CommandResult { 

        return this.ConstructEmbed(errorName, errorMessage, "#FFC300") 
    }

    public static Success(succeededOperation: string, successMessage: string) : CommandResult {

        return this.ConstructEmbed(succeededOperation, successMessage, "#28FF00")
    }

    public static SuccessSilent() : CommandResult {

        return new CommandResult()
    }

    private static ConstructEmbed(header: string, body: string, color: string) : CommandResult {
        
        const result: CommandResult = new CommandResult()
        result._sendMessage = true
        result.Value = new MessageEmbed({ 
            title: header,
            description: body,
            timestamp: Date.now() / 1000,
            color: color,
            author: { name: '', url: '' },
            footer: { text: '', iconURL: '' }
        })
        return result
    }
}