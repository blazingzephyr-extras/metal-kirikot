"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
var Command_1 = require("../Utilities/Command");
exports.command = new Command_1.Command({
    Name: "test",
    Usage: ["test"],
    CommandGroup: Command_1.CommandGroup.Any,
    CommandType: Command_1.CommandType.BotOwnerOnly,
    RequiredPermissions: ["ADMINISTRATOR"],
    Execute: function (eventArgs) {
        console.log(eventArgs.User);
    }
});
