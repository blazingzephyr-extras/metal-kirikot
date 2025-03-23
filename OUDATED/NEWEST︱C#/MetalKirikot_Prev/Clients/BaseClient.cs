using System;
using System.Threading.Tasks;

using DSharpPlus;
using MetalKirikot.Utilities;

namespace MetalKirikot.Clients {

    public abstract class BaseClient {

        //Bot's Discord Client
        public DiscordClient Client { get; private set; }

        //Protected fields
        protected abstract String BotType { get; }
        protected abstract String Activity { get; }

        public BaseClient() {

            //Initializing client
            var config = Utility.Config.Client;
            var configuration = new DiscordConfiguration {
                AutoReconnect = config.AutoReconnect,
                LargeThreshold = config.LargeThreshold,
                MinimumLogLevel = config.LogLevel,
                Token = config.Tokens[BotType],
                ShardId = config.ShardId,
                ShardCount = config.ShardCount,
                MessageCacheSize = config.MessageCacheSize,
                LogTimestampFormat = config.DateTimeFormat
            };
            Client = new (config: configuration);
        }

        public async Task Launch() {

            //Launches an action, which is different for both bots
            BeforeLaunch();

            //Connects to Discord
            var presences = Utility.Config.Client.Presence[BotType];
            await Client.ConnectAsync(
                activity: new (name: Activity, type: presences.ActivityType),
                status: presences.UserStatus
           );
            await Task.Delay(-1);
        }

        public async Task Shutdown() {

            //Shutting down bot
            await Client.DisconnectAsync();
        }

        protected abstract void BeforeLaunch();
    }
}