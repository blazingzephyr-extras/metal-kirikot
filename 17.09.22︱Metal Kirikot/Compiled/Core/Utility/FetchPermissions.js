"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPermissions = void 0;
const Text_1 = require("../../Text");
function FetchPermissions(permissions, language) {
    let requiredPermissions = [];
    for (let i in permissions) {
        const permissionString = permissions[i].toLowerCase();
        const permission = Text_1.TEXT[language]['permissions'][permissionString];
        requiredPermissions.push(`**${permission}**`);
    }
    return requiredPermissions.join(',');
}
exports.FetchPermissions = FetchPermissions;
