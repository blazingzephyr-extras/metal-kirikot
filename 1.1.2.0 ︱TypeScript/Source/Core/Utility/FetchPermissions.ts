
import { PermissionString } from 'discord.js';
import { Language, TEXT } from '../../Text';
export { FetchPermissions };

function FetchPermissions(permissions: PermissionString[], language: Language) {

    let requiredPermissions: string[] = [];
    for(let i in permissions) {

        const permissionString = permissions[i].toLowerCase();
        const permission = TEXT[language]['permissions'][permissionString];
        requiredPermissions.push(`**${permission}**`);
    }

    return requiredPermissions.join(',');
}