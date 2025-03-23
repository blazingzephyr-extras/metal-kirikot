
import { Message } from 'discord.js';
import { Dictionary } from '../../Utility/Dictionary';
import { ConstructEmbed } from '../../Utility/EmbedConstructor';
export { Result, ResultData }

interface ResultData {

    readonly Send: boolean, 
    readonly IsSuccessful: boolean,
    readonly Header?: string, 
    readonly Body?: string, 
    readonly Color?: string
}

class Result {

    private data: ResultData;
    public constructor(data: ResultData) { this.data = data; }

    public Evaluate(message: Message, text: Dictionary<any>) {

        const data = this.data
        const embed = data.Send ? ConstructEmbed(text, message.guild, data.Header, data.Body, data.Color ) : null;

        return { 
            SendMessage: data.Send, 
            IsSuccessful: data.IsSuccessful, 
            MessageEmbed: embed
        };
    }
}