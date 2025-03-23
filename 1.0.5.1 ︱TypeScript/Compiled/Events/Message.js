"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const event = {
    EventType: "message",
    Execute: (message) => {
        if (message.content == "m!ping")
            message.channel.send(Date.now() - message.createdTimestamp);
    }
};
exports.event = event;
