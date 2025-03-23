
export { Cooldown, TargetType }

type TargetType = 'Global' | 'Guild' | 'Channel' | 'User';
interface Cooldown {

    readonly Target: TargetType,
    readonly Duration: number
}