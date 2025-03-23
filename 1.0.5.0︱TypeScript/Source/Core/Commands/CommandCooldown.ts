
export { CommandCooldown }

type CooldownTargetType = 'Global' | 'Guild' | 'Channel' | 'User'

interface CommandCooldown {

    readonly CooldownTarget: CooldownTargetType,
    readonly CooldownDuration: number
}