using System;
using System.Linq;
using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;

namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Utility for storing command properties for better accessibility and performance
    /// </summary>
    public struct CommandContext {

        /// <summary>
        /// Discord user that sent the message
        /// </summary>
        public DiscordClient Client { get; init; }

        /// <summary>
        /// Discord message that triggered the command
        /// </summary>
        public DiscordMessage Message { get; init; }

        /// <summary>
        /// Discord user that sent the message
        /// </summary>
        public DiscordUser User { get; init; }

        /// <summary>
        /// Discord channel message was sent to
        /// </summary>
        public DiscordChannel Channel { get; init; }

        /// <summary>
        /// Discord guild message was sent in
        /// </summary>
        public DiscordGuild Guild { get; init; }

        /// <summary>
        /// Discord member that sent the message
        /// </summary>
        public DiscordMember Member { get; init; }

        /// <summary>
        /// Message's attachments
        /// </summary>
        public DiscordAttachment[] Attachments { get; init; }

        /// <summary>
        /// Users who were mentioned in the message
        /// </summary>
        public DiscordUser[] MentionedUsers { get; init; }

        /// <summary>
        /// Roles which were mentioned in the message
        /// </summary>
        public DiscordRole[] MentionedRoles { get; init; }

        /// <summary>
        /// Channels  which were mentioned in the message
        /// </summary>
        public DiscordChannel[] MentionedChannels { get; init; }

        /// <summary>
        /// Provided command arguments
        /// </summary>
        public String[] Args { get; init; }

        public static implicit operator CommandContext((DiscordClient client, MessageCreateEventArgs args) v)
            => new CommandContext {
                         Client = v.client,
                         Message = v.args.Message,
                         User = v.args.Author,
                         Channel = v.args.Channel,
                         Guild = v.args.Guild,
                         Member = v.args.Guild?.GetMemberAsync(v.args.Author.Id).Result,
                         Attachments = v.args.Message.Attachments as DiscordAttachment[],
                         MentionedUsers = v.args.MentionedUsers as DiscordUser[],
                         MentionedRoles = v.args.MentionedRoles as DiscordRole[],
                         MentionedChannels = v.args.MentionedChannels as DiscordChannel[],
                         Args = v.args.Message.Content?.Split(" ").Skip(1) as String[]
                 };
    }
}