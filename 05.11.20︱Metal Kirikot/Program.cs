using DSharpPlus;
using Metal_Kirikot.Utilities.Events;
using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace Metal_Kirikot {
    public class Program {
        static public Collection<Command> Command { get; private set; }
        static public DiscordClient MetalKirikot { get; private set; }
        static async Task Main() {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("config.json", optional: false, reloadOnChange: true)
                .Build();

            DiscordConfiguration Config = new DiscordConfiguration { 
                AutomaticGuildSync = true,
                AutoReconnect = true,
                DateTimeFormat = "DD:MM:YY",
                Token = "",
                TokenType = TokenType.Bot,
                ShardCount = 1 
            };
            DiscordClient MetalKirikot = new DiscordClient(Config);

            Console.WriteLine("Connecting..");
            await MetalKirikot.ConnectAsync();
            Console.WriteLine($"Connected as {MetalKirikot.CurrentUser.Username}!");

            Console.ReadKey();
        }
    }
}