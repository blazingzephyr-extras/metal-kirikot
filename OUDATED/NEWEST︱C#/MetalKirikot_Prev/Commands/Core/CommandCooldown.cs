using System;

namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Command cooldown utility
    /// </summary>
    public struct CommandCooldown {

        /// <summary>
        /// Indicates who does cooldown applies to
        /// </summary>
        public CooldownBucketType BucketType { get; init; }

        /// <summary>
        /// Duration of cooldown
        /// </summary>
        public Double CooldownDuration { get; init; }

        public static implicit operator CommandCooldown((CooldownBucketType bucketType, Double cooldownDuration) value)
            => new CommandCooldown { BucketType = value.bucketType, CooldownDuration = value.cooldownDuration };
    }

    /// <summary>
    /// Enumerator, representing what does cooldown applies to 
    /// </summary>
    public enum CooldownBucketType : Byte {

        /// <summary>
        /// Cooldown applies to current user in both DM and guild
        /// </summary>
        User = 0,

        /// <summary>
        /// Cooldown applies to whole channel, so nobody can use it until it's recharged
        /// </summary>
        Channel = 1,

        /// <summary>
        /// Cooldown applies to whole guild
        /// </summary>
        Guild = 2,

        /// <summary>
        /// Cooldown is global, so until ccommand is recharged, nobody can use it
        /// </summary>
        Global = 3
    }
}