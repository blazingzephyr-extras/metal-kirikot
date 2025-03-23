import { PermissionString } from "discord.js";
import { Dictionary } from "./Dictionary";

export { FetchPermissions }

function FetchPermissions(permissions: PermissionString[], text: Dictionary<any>) {

    let requiredPermissions: string = ''
    for(let i in permissions)
        requiredPermissions += text['permissions'][permissions[i].toLowerCase()]

    return `**${requiredPermissions}**`
}