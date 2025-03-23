import { Message } from "discord.js"
import { Config } from "../Utility/Config"
import { Dictionary } from "../Utility/Dictionary";
import { EmbedConstructor } from "../Utility/EmbedConstructor"

/*
interface ResultProperties {

    
}

class CommandResult {

    public readonly IsSuccessful: boolean;
    readonly SendMessage: boolean;
    readonly IsSuccessful: boolean;
    readonly MessageEmbed?: {

        readonly Color: string,
        readonly Header: string,
        readonly Body: string
    };

    constructor(_properties: ResultProperties) {

        this._properties = _properties;
        this.IsSuccessful = _properties.IsSuccessful;
    }
}
*/
/*
export { CommandResult, Result, SilentResult }


function Result(type: "success" | "warn" | "error", header: string, body: string) : CommandResult {

    return new CommandResult({ 
        SendMessage: true, 
        IsSuccessful: type == "error" ? false : true, 
        MessageEmbed: { 
            Color: Config.Colors[type], 
            Header: header, 
            Body: body 
        }
    });
}

function SilentResult() : CommandResult {

    return new CommandResult({ 
        SendMessage: false, 
        IsSuccessful: true 
    });
}

interface ResultProperties {

    readonly SendMessage: boolean,
    readonly IsSuccessful: boolean,
    readonly MessageEmbed?: {

        readonly Color: string,
        readonly Header: string,
        readonly Body: string
    }
}

class CommandResult {

    public readonly IsSuccessful: boolean;
    private readonly _properties: ResultProperties;

    constructor(_properties: ResultProperties) {

        this._properties = _properties;
        this.IsSuccessful = _properties.IsSuccessful;
    }

    public Evaluate(message: Message, text: Dictionary<any>) {

        const properties: ResultProperties = this._properties;
        const embedProperties = properties.MessageEmbed;
        const embed = properties.SendMessage ? EmbedConstructor.ConstructEmbed(text, message.guild, embedProperties.Header, embedProperties.Body, embedProperties.Color ) : null;

        return { 
            SendMessage: properties.SendMessage, 
            IsSuccessful: true, 
            MessageEmbed: embed
        };
    }
}*/