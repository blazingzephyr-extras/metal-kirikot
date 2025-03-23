"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const Database_Index_1 = require("../Core/Database/Database.Index");
const event = {
    Event: 'channelDelete',
    Execute: (channel) => {
        const channelType = channel.type;
        if (channelType == 'dm' || channelType == 'text' || channelType == 'news')
            Database_Index_1.Database.DeleteChannel(channel.id);
    }
};
exports.event = event;
