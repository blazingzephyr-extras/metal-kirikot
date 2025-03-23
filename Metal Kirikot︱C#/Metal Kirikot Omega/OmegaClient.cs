using System;
using System.IO;

using DSharpPlus.Entities;
using Metal_Kirikot.Clients;
using Metal_Kirikot.Utilities;
using Metal_Kirikot.Events;
using Newtonsoft.Json.Linq;
using System.Linq;

namespace Metal_Kirikot_Omega {

    internal class OmegaClient : Client {

        public override String BotType => "omega";
        protected override String Activity => $"build {Config["version"]["build"].Value<Int32>()}! 😸";
        protected override UserStatus UserStatus => UserStatus.Online;

        protected override void OnAwake() {

            Config["version"]["build"] = Config["version"]["build"].Value<Int32>() + 1;
            File.WriteAllText(path: Util.ConfigPath, contents: Config.ToString());

            //Discord.MessageCreated += async (client, args) => await Events.MessageCreated(client: client, args: args);

            Discord.GuildDownloadCompleted += async (client, args) => {

                var guild = await Discord.GetGuildAsync(668807021260439553);
                guild.Roles.TryGetValue(773105343328288778, out DiscordRole gemDust);
                guild.Roles.TryGetValue(730379626198597674, out DiscordRole english);
                guild.Roles.TryGetValue(773105344237797399, out DiscordRole soil);

                var members = await guild.GetAllMembersAsync();
                foreach (var member in members) {

                    
                    if(member.Roles.Count() == 0)
                    {

                        await member.GrantRoleAsync(gemDust, "Removing verification");
                        await member.GrantRoleAsync(soil, "Removing verification");
                        await member.GrantRoleAsync(english, "Removing verification");
                    }
                }
            };
        }
    }
}