
import { PermissionString } from 'discord.js'
import { Dictionary } from './Dictionary'
export { FetchPermissions }

function FetchPermissions(permissions: PermissionString[], text: Dictionary<any>) {

    let requiredPermissions: string[] = [];
    for(let i in permissions) {

        let permissionString = permissions[i].toLowerCase();
        let permission = text['permissions'][permissionString];
        requiredPermissions.push(`**${permission}**`);
    }

    return requiredPermissions.join(',');
}