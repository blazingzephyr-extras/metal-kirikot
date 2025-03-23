
import { TargetType } from '../Commands/Properties/Cooldown';
export { CooldownEntry }

interface CooldownEntry {
    
    readonly Type: TargetType,
    readonly CommandName: string,
    readonly ExpireDate: number
    readonly TargetId?: string
}