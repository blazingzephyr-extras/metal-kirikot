"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = exports.CommandGroup = exports.Command = void 0;
var Command = /** @class */ (function () {
    function Command(options) {
        this.Options = options;
    }
    return Command;
}());
exports.Command = Command;
var CommandGroup;
(function (CommandGroup) {
    CommandGroup[CommandGroup["Any"] = 0] = "Any";
    /*Moderation,
    LevelUp,
    Color,
    Fun,
    Music*/
})(CommandGroup = exports.CommandGroup || (exports.CommandGroup = {}));
var CommandType;
(function (CommandType) {
    CommandType[CommandType["BotOwnerOnly"] = 0] = "BotOwnerOnly";
    CommandType[CommandType["BetaTesterOnly"] = 1] = "BetaTesterOnly";
    CommandType[CommandType["GuildOwnerOnly"] = 2] = "GuildOwnerOnly";
    CommandType[CommandType["GuildOnly"] = 3] = "GuildOnly";
    CommandType[CommandType["Everywhere"] = 4] = "Everywhere";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
