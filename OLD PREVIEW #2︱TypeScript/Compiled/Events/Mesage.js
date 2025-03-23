"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Index_1 = require("../Core/Commands/Index");
const event = {
    Event: 'message',
    Execute: (message) => Index_1.CommandHandler.Run(message)
};
exports.event = event;
