using System;
using System.IO;
using System.Threading.Tasks;

using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Metal_Kirikot.Utilities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Metal_Kirikot.Clients {

    public abstract class Client {

        public DiscordClient Discord { get; protected set; }
        public abstract String BotType { get; }
        protected abstract String Activity { get; }
        protected abstract UserStatus UserStatus { get; }
        public JObject Config { get; protected set; }
        protected FileStream _configStream;

        protected Client() {

            String content = File.ReadAllText(path: Util.ConfigPath);
            Config = JObject.Parse(json: content);

            var configuration = new DiscordConfiguration {
                AutoReconnect = Config["autoReconnect"].Value<Boolean>(),
                LargeThreshold = Config["largeThreshold"].Value<Int32>(),
                MinimumLogLevel = (LogLevel)Config["logLevel"].Value<Byte>(),
                Token = Config["tokens"][BotType].Value<String>(),
                MessageCacheSize = Config["messageCacheSize"].Value<Int32>()
            };
            Discord = new (config: configuration);
            Discord.UseInteractivity(configuration: new ());
            OnAwake();
        }

        protected abstract void OnAwake();

        public async Task Launch() {

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"Logging...");
            await Discord.ConnectAsync (
                activity: new DiscordActivity (name: Activity, type: ActivityType.Playing), 
                status: UserStatus
            );
            Console.WriteLine($"Logged in as {Discord.CurrentUser.Username}!");
            await Task.Delay(-1);
        }

        public async Task Shutdown() {

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"{Discord.CurrentUser.Username} is shutting down...");
            await Discord.DisconnectAsync();
            Console.WriteLine($"{Discord.CurrentUser.Username} shut down.");
        }
    }
}