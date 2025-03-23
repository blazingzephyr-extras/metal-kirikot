using System;
using System.Linq;

using DSharpPlus.Entities;
using DSharpPlus.EventArgs;

namespace MetalKirikot.Commands.Core {

    //Data type for storing command properties for better accessibility and performance
    public struct CommandEventArgs {

        public DiscordMessage Message { get; init; }
        public DiscordUser User { get; init; }
        public DiscordChannel Channel { get; init; }
        public DiscordGuild Guild { get; init; }
        public DiscordMember Member { get; init; }
        public DiscordAttachment[] Attachments { get; init; }
        public String[] Args { get; init; }

        public CommandEventArgs(MessageCreateEventArgs eventArgs)
            => (Message, User, Channel, Guild, Member, Attachments, Args)
            = (eventArgs.Message, eventArgs.Author, eventArgs.Channel, eventArgs.Guild,
               eventArgs.Guild?.GetMemberAsync(eventArgs.Author.Id).Result,
               eventArgs.Message.Attachments as DiscordAttachment[], 
               eventArgs.Message.Content?.Split(" ").Skip(1) as String[]);
    }
}