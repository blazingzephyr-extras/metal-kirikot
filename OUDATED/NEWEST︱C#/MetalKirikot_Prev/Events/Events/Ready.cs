﻿using System;
using System.IO;
using System.Text;

using DSharpPlus;
using MetalKirikot.Utilities;

namespace MetalKirikot.Events {

    /// <summary>
    /// Utility for handling events
    /// </summary>
    public static partial class EventHandler {

        /// <summary>
        /// Async method occuring when client is ready
        /// </summary>
        public static async void Ready(DiscordClient client, String botType) {

            //Getting information from bot about guilds, channels and etc.
            String guilds = String.Join("\n        ", client.Guilds),
                    dms = String.Join("\n        ", client.PrivateChannels);

            //Wrapping up all information in one string
            StringBuilder builder = new ();
            builder.AppendJoin('\n',
                $"Successfully logged in as {client.CurrentUser.Username + "#" + client.CurrentUser.Discriminator}! ✅",
                $"Current Time: {DateTime.Now}",
                $"Current UTC Time: {DateTime.UtcNow}\n",
                $"Current Application: {client.CurrentApplication.Name}",
                $"Current Application Owner: {client.CurrentApplication.Name}",
                $"Gateway URL: {client.GatewayUri}",
                $"Gateway Version: {client.GatewayVersion}",
                $"Shard Ammount: {client.ShardCount}",
                $"Current Shard ID: {client.ShardId}",
                $"Guilds: [ {guilds} ]",
                $"DM Channels: [ {dms} ]"
            );

            //Saving the data
            var version = Utility.Config.Version;
            var versionPath = botType == "omega" ? $"{version.Omega}" : $"{version.Alpha.Global}.{version.Alpha.Monthly}.{version.Alpha.Content}";
            var path = @$"{Utility.Dir}\Logs\{botType}.{versionPath}";
            File.WriteAllText(path: path, contents: builder.ToString(), encoding: Encoding.UTF8);

            //Informing that bot is running and is ready
            Console.WriteLine($"{botType.ToUpper()} is ready!");
        }
    }
}