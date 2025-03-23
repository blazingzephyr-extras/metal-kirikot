using System;

namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Command access utility
    /// </summary>
    public struct CommandAccess {

        /// Publuc init-only properties
        public BotAccess AccessType { get; init; }
        public ChannelAccessType ChannelAccess { get; init; }
        public AccessLevel AccessLevel { get; init; }

        public static implicit operator CommandAccess((BotAccess accessType, ChannelAccessType channelAccess, AccessLevel accessLevel) value)
            => new CommandAccess { AccessType = value.accessType, ChannelAccess = value.channelAccess, AccessLevel = value.accessLevel };
    }

    /// <summary>
    /// Enumerator, representing which bot client have access to this command
    /// </summary>
    public enum BotAccess : SByte {
        /// <summary>
        /// This command is available to use only for Metal Kirikot Α
        /// </summary>
        AlphaOnly = -1,
        /// <summary>
        /// This command is available to use only for Metal Kirikot Ω
        /// </summary>
        OmegaOnly = 1,
        /// <summary>
        /// This command is available to use for both bots
        /// </summary>
        Both = 1
    }

    /// <summary>
    /// Enumerator, representing  who have access to this command
    /// </summary>
    public enum AccessLevel : SByte {
        /// <summary>
        /// Only bot's owner can use this command
        /// </summary>
        BotOwnerOnly = -1, 
        /// <summary>
        /// Only beta testers can use this command
        /// </summary>
        BetaTesterOnly = 0,  
        /// <summary>
        /// This command is guild-only and requires guild ownership
        /// </summary>
        GuildOwnerOnly = 1, 
        /// <summary>
        /// This command is guild-only and requires administrator permissions
        /// </summary>
        AdminOnly = 2,
        /// <summary>
        /// Everyone can use this command
        /// </summary>
        Everyone = 4
    }

    /// <summary>
    /// Enumerator, representing where the command is avaible to use
    /// </summary>
    public enum ChannelAccessType : SByte {
        /// <summary>
        /// The command is avaible to use everywhere
        /// </summary>
        Everywhere = 0,
        /// <summary>
        /// This command is exclusive for DM channels
        /// </summary>
        DMOnly = -1,
        /// <summary>
        /// The command is exclusive for guild channels
        /// </summary>
        GuildOnly = 1
    }
}