import { CooldownEntry } from './CooldownEntry'

export { SpecifiedEntry }

interface SpecifiedEntry extends CooldownEntry {

    readonly TargetId: string
}
