"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandler_1 = require("../../Commands/Core/CommandHandler");
exports.event = {
    Event: 'message',
    Function: (message) => CommandHandler_1.CommandHandler.Run(message)
};
