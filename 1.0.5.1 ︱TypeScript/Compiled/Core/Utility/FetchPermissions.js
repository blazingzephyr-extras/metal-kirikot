"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPermissions = void 0;
function FetchPermissions(permissions, text) {
    let requiredPermissions = "";
    for (let i in permissions)
        requiredPermissions += text["permissions"][permissions[i].toLowerCase()];
    return `**${requiredPermissions}**`;
}
exports.FetchPermissions = FetchPermissions;
