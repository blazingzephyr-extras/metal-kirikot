using System;
using System.Collections.Generic;
using System.Linq;
using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity.Extensions;
using Metal_Kirikot.Clients;

namespace Metal_Kirikot_Alpha {

    internal class AlphaClient : Client {

        public override String BotType => "alpha";
        protected override String Activity 
            => $"version {Config["version"]["global"]}." +
                 $"{Config["version"]["montly"]}." +
                 $"{Config["version"]["current"]}! 😸";
        protected override UserStatus UserStatus => UserStatus.Idle;
        List<DiscordGuild> guilds = new List<DiscordGuild>();

        protected override void OnAwake() {


            Discord.GuildDownloadCompleted += async (client, g) => {

                foreach((var key, var channel) in Discord.PrivateChannels) {

                    var messages = await channel.GetMessagesAsync(100);
                    foreach (var message in messages)
                        await message.DeleteAsync();
                }

                /*DiscordChannel channel = PI.GetChannel(0);
                channel.ModifyAsync(editMode => {

                    editMode.Name = "";
                    editMode.Topic = "";
                    editMode.Nsfw = false;
                    editMode.PerUserRateLimit = 0;

                    if (channel.Type == ChannelType.Voice) {

                        editMode.Bitrate = 0;
                    }
                    editMode.AuditLogReason = "";
                });

                channel.AddOverwriteAsync()*/









                /*
                DiscordGuild secret = await client.GetGuildAsync(816668067798319105);
                DiscordUser user = await PI.GetMemberAsync(448836861155213312);
                await secret.AddMemberAsync(user: user, access_token: "040915");
                Console.WriteLine("Works!");*/
                /*
                DiscordGuild PI = await client.GetGuildAsync(668807021260439553);
                DiscordGuild tuan = await client.GetGuildAsync(697374199525933077);

                await tuan.RequestMembersAsync(presences: true);
                var members = await tuan.GetAllMembersAsync();
                var channel = tuan.GetChannel(811956641574551554);
                var channel1 = tuan.GetChannel(697376390789595156);
                var intreractivity = Discord.GetInteractivity();

                foreach (var member in members) {

                    UInt64 id = member.Id;

                    DiscordMember fetchedMember = await tuan.GetMemberAsync(userId: id);
                    DiscordMember piMember = null;

                    try  {  piMember = await PI.GetMemberAsync(userId: id);  }
                    catch {

                        Boolean admin = fetchedMember.PermissionsIn(channel).HasPermission(Permissions.Administrator);
                        if (!admin && piMember == null) {

                            try  {
                                fetchedMember.SendMessageAsync(content:
                               "Hello! Here's friendly reminder: Tuan's server is currently dead and archived after SN merge, so don't forget to move on a new one!\nhttps://discord.gg/FAmzkyzQqC\n\nAlso don't forget to visit our merge partner, the biggest PvZ server — Sunflower Nation!\nhttps://discord.gg/BUVAdtKpzJ\n\nSincerely, The Owner (TENACIOUS Kirikot!#2116).");
                            }

                           finally { channel1.SendMessageAsync($"{fetchedMember.DisplayName}"); }
                        }
                    }
                }*/
            };
            Discord.MessageCreated += async (client, args) => Events.MessageCreated_Beta(client, args);
        }
    }
}