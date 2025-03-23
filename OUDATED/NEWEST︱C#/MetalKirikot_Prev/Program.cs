using DSharpPlus.Entities;
using DSharpPlus.Interactivity.Extensions;
using MetalKirikot.Clients;
using MetalKirikot.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Utf8Json;

namespace MetalKirikot {

    class Program  {

        static void Main() {

            //Initializing configuration...
            var file = File.ReadAllText(path: Utility.ConfigPath, encoding: Encoding.UTF8);
            Utility.Config = JsonSerializer.Deserialize<Configuration>(json: file);

            //Loading BotStrings....
            String[] languages = { "EN-us", "RU-ru", "IT-it" };
            for (var i = 0; i < languages.Length; i++) {

                var text = File.ReadAllText(path: $"{Utility.Dir}/Assets/BotStrings/{languages[i]}.json", encoding: Encoding.UTF8);
                Utility.BotStrings[i] = JsonSerializer.Deserialize<Dictionary<String, String>>(json: text);
            }

            //Intializing both bots...
            BaseClient alpha = new AlphaClient(),
                                 omega = new OmegaClient();

            //Launching Omega...
            Task.Factory.StartNew(action: () => omega.Launch());








            DiscordMessage message = new DiscordMessage();
            message.CreateReactionAsync(DiscordEmoji.FromUnicode(""));
            message.DoPollAsync(new DiscordEmoji[] {}, DSharpPlus.Interactivity.Enums.PollBehaviour.DeleteEmojis).

            //Launching Alpha...
            alpha.Launch().GetAwaiter().GetResult();
        }
    }
}