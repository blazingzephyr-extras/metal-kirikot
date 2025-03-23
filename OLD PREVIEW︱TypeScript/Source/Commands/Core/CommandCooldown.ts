
export interface CommandCooldown {

    readonly BucketType: CooldownBucketType,
    readonly CooldownDuration: number
}

export enum CooldownBucketType {

    User = 0,
    Channel = 1,
    Guild = 2,
    Global = 3
}