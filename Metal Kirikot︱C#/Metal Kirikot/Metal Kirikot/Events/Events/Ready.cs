using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DSharpPlus;
using Metal_Kirikot.Clients;
using Metal_Kirikot.Utilities;

namespace Metal_Kirikot.Events {

    public static partial class Events {

        public static async Task Ready(Client baseClient) {

            DiscordClient client = baseClient.Discord;
            String botType = baseClient.BotType;
            String guilds = String.Join("\n        ", client.Guilds),
                         dms = String.Join("\n        ", client.PrivateChannels);

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

            var version = baseClient.Config["version"];
            var versionPath = botType == "omega" ? $"{version["build"]}" : $"{version["global"]}.{version["montly"]}.{version["current"]}";
            var path = @$"{Util.Dir}\..\Logs\{botType}.{versionPath}";
            File.WriteAllText(path: path, contents: builder.ToString(), encoding: Encoding.UTF8);

            Console.WriteLine($"{botType.ToUpper()} is ready!");
        }
    }
}