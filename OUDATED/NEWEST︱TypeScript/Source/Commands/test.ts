import { Command, CommandGroup, CommandType } from "../Utilities/Command";

export const command: Command = new Command({
    Name: "test",
    Usage: ["test"],
    CommandGroup: CommandGroup.Any,
    CommandType: CommandType.BotOwnerOnly,
    RequiredPermissions: ["ADMINISTRATOR"],

    Execute: eventArgs => {
        console.log(eventArgs.User);
    }
})