
export { CommandCooldown, CooldownBucketType }

type CooldownBucketType = 'User' | 'Channel' | 'Guild' | 'Global'

interface CommandCooldown {

    readonly CooldownBucket: CooldownBucketType,
    readonly Cooldown: number
}