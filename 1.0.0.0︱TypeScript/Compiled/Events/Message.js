"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Commands_Index_1 = require("../Core/Commands/Commands.Index");
const event = {
    Event: 'message',
    Execute: (message) => {
        Commands_Index_1.CommandHandler.Run(message);
    }
};
exports.event = event;
