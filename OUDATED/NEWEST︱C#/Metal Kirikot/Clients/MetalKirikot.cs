using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

using DSharpPlus;
using MetalKirikot.Utilities;

namespace MetalKirikot.Clients {

    //Abstract class representing bot
    public abstract class MetalKirikot {

        //Bot's DiscordClient
        public DiscordClient Client { get; private set; }

        //Protected fields
        protected abstract String BotType { get; }
        protected dynamic _client = Utility.Json["client"];

        //Bot's constructor which initializes all properties and everything else
        public MetalKirikot() {

            //Initializing configuration and client
            (LogLevel logLevel, TokenType tokenType) = (Enum.Parse<LogLevel>(_client["logLevel"]),
                                                        Enum.Parse<TokenType>(_client["tokenType"]));
            var config = new DiscordConfiguration {
                AutoReconnect = _client["autoReconnect"],
                LargeThreshold = (Byte)_client["largeThreshold"],
                MinimumLogLevel = logLevel,
                Token = _client["token"][BotType],
                TokenType = tokenType,
                ShardId = (Byte)_client["shardId"],
                ShardCount = (Byte)_client["shardCount"],
                MessageCacheSize = (Byte)_client["messageCacheSize"],
                LogTimestampFormat = _client["dateTimeFormat"]
            };
            Client = new (config: config);
        }

        public abstract Task Launch();
    }
}