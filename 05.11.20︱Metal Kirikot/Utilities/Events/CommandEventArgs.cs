using DSharpPlus.Entities;
using System;

namespace Metal_Kirikot.Utilities {
    Coolec
    record CommandEventArgs : EventArgs {
        /*public BaseDiscordClient Client { get; set; }
        public DiscordMessage Message { get; set; }
        public DiscordUser User { get; set; }
        public DiscordMember Member { get; set; }
        public DiscordGuild Guild { get; set; }
        public DiscordChannel Channel { get; set; }
        public string[] Arguments { get; set; }
        public DiscordAttachment[] Attachments { get; set; }
        public EventArgs(MessageCreateEventArgs message) {
            Client = message.Client;
            Message = message.Message;
            User = message.Author;
            Channel = message.Channel;
            Arguments = message.Message.Content.Split(' ').Skip(1).ToArray();
            Attachments = message.Message.Attachments.ToArray();

            string username = User.Username;
            Guild = message.Guild == null ? null : message.Guild;
            Member = message.Guild == null ? null : message.Guild.Members.First(member => member.Username == username);
        }*/
        public DiscordMessage Message { get; private set; }
        public DiscordUser User { get; private set; }
    }
}
