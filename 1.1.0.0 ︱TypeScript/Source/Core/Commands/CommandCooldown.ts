
export { CommandCooldown }

type CooldownTargetType = "Global" | "Guild" | "Channel" | "User";

interface CommandCooldown {

    readonly Target: CooldownTargetType,
    readonly Duration: number
};