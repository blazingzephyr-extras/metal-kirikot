"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = {
    Event: 'guildMemberAdd',
    Function: (member) => console.log(member.user.username)
};
