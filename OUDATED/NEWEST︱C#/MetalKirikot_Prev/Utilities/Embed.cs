using System;

using DSharpPlus.Entities;
using static DSharpPlus.Entities.DiscordEmbedBuilder;
using MetalKirikot.Commands.Core;

namespace MetalKirikot.Utilities {

    /// <summary>
    /// Utility which has different embed actions
    /// </summary>
    public static class Embed {
        
        public static DiscordEmbed ErrorEmbed(String name, String description, CommandContext context, Boolean inline = false) {

            var user = context.User;

            var builder = new DiscordEmbedBuilder {
                Author = new EmbedAuthor { Name = $"{user.Username}#{user.Discriminator}", IconUrl = $"{user.AvatarUrl}" },
                Title = "❌ An error has occured!",
                Color = Utility.Config.Colors["errorRed"],
                Footer = new EmbedFooter { Text = $"Metal Kirikot | {$"{context.Guild?.Name} | " ?? ""}{DateTime.UtcNow}",
                                                                       IconUrl = $"{context.Client.CurrentUser.AvatarUrl}" },
                Url = "https://discord.gg/wSsdJcAUFr"
            };
            builder.AddField(name: name, value: description, inline: inline);
            return builder.Build();
        }
    }
}