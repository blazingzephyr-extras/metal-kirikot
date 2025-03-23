"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventArgs = void 0;
var main_1 = require("../main");
/**
 * Useful utility created for sending parameters
 */
var EventArgs = /** @class */ (function () {
    function EventArgs(message) {
        this.Client = main_1.MetalKirikot;
        this.Message = message;
        this.User = message.author;
        this.Member = message.member;
        this.Channel = message.channel;
        this.Guild = message.guild;
        this.Arguments = message.content.split(" ").slice(1);
        this.Attachments = message.attachments.array();
    }
    return EventArgs;
}());
exports.EventArgs = EventArgs;
