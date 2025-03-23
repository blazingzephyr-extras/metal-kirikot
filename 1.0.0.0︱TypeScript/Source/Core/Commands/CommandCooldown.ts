
export { CommandCooldown }

type CooldownBucketType = 'User' | 'Channel' | 'Guild' | 'Global'

interface CommandCooldown {

    readonly CooldownBucket: CooldownBucketType,
    readonly Cooldown: number
}