using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using MetalKirikot.Commands.Core;
using MetalKirikot.Utilities;
using System;

namespace MetalKirikot.Events {

    /// <summary>
    /// Utility for handling events
    /// </summary>
    public static partial class EventHandler {

        /// <summary>
        ///  Async method occuring when new message is created
        /// </summary>
        public static async void MessageCreated(MessageCreateEventArgs eventArgs, DiscordClient client) {

            Boolean isCommand = eventArgs.Message.Content.StartsWith("m!");
            if (!isCommand || eventArgs.Message.Author.IsBot) return;

            String[] splittedMessage = eventArgs.Message.Content.Split(" ");
            String commandText = splittedMessage[0].Replace("m!", null);

            var search = CommandHandler.Find(commandText);
            if(!search.exists) {

                DiscordEmbed embed = Embed.ErrorEmbed($"Command named \"{commandText}\" doesn't exist!", "Try using something else", (client, eventArgs));
                await eventArgs.Channel.SendMessageAsync(embed: embed);
            }
            else   search.command?.Execute((client, eventArgs));
        }
    }
}