using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Metal_Kirikot.Utilities;
using Newtonsoft.Json.Linq;
using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using static DSharpPlus.Entities.DiscordEmbedBuilder;

namespace Metal_Kirikot_Alpha {


    public static class Class
    {
        public static ulong ServerID { get; set; }
        public static ulong ChannelID { get; set; }
    }

    public static partial class Events {

        public static async Task MessageCreated_Beta(DiscordClient client, MessageCreateEventArgs args) {

            DiscordMessage message = args.Message;

            if (args.Author.IsBot) return;

            if (message.Content == "m!giveModerator")
            {
                DiscordMember member = await message.Channel.Guild.GetMemberAsync(message.Author.Id);
                DiscordRole role = message.Channel.Guild.Roles[833536012616728586];
                await member.GrantRoleAsync(role);
            }
            if(message.Content.Split(" ")[0] == "m!kick")
            {

                DiscordMember member = await message.Channel.Guild.GetMemberAsync(UInt64.Parse(message.Content.Split(" ")[1]));
                message.Channel.Guild.BanMemberAsync(member);
                message.Channel.Guild.UnbanMemberAsync(member);
            }
               if (message.Content == "m!poll")
            {
                String path = @$"{Util.Dir}\..\Downloaded Files\{message.Id}.json";
                WebClient webClient = new WebClient();

                webClient.DownloadFile(message.Attachments[0]?.Url, path);
                String content = File.ReadAllText(path: path);
                if (message.Attachments.Count == 0) return;
                try
                {
                    JObject poll = JObject.Parse(json: content);
                    DiscordEmbedBuilder builder = new DiscordEmbedBuilder()
                    {
                        Author = new EmbedAuthor
                        {
                            IconUrl = poll["author"]?["iconUrl"]?.Value<String>(),
                            Name = poll["author"]?["name"]?.Value<String>()
                        },
                        Color = new DiscordColor(color: poll["color"]?.Value<String>()),
                        Title = poll["title"]?.Value<String>(),
                        Timestamp = DateTime.UtcNow,
                        Footer = new EmbedFooter
                        {
                            IconUrl = poll["footer"]?["iconUrl"]?.Value<String>(),
                            Text = poll["footer"]?["text"]?.Value<String>()
                        },
                        Description = poll["description"]?.Value<String>(),
                        ImageUrl = poll["imageUrl"]?.Value<String>(),
                        Url = poll["url"]?.Value<String>(),
                        Thumbnail = new EmbedThumbnail
                        {
                            Url = poll["thumbnail"]?["url"]?.Value<String>(),
                            Width = poll["thumbnail"]?["width"]?.Value<Int32>() ?? 35,
                            Height = poll["thumbnail"]?["height"]?.Value<Int32>() ?? 35,
                        }
                    };

                    if (poll["fields"]?.Count() > 0)
                    {

                        foreach (var element in poll["fields"])
                            builder.AddField(
                                name: element["name"]?.Value<String>(),
                                value: element["value"]?.Value<String>(),
                                inline: element["inline"]?.Value<Boolean>() ?? false
                        );
                    }

                    DiscordChannel channel = client.GetChannelAsync(id: poll["channel"].Value<UInt64>()).Result;
                    DiscordMessage pollMessage =
                        channel.SendMessageAsync(content: poll["message"]?.Value<String>(), embed: builder.Build()).GetAwaiter().GetResult();

                    foreach (var element in poll["emojis"])
                        await pollMessage.CreateReactionAsync(emoji: DiscordEmoji.FromName(client: client, name: element.Value<String>(), includeGuilds: true));

                    await message.Channel.SendMessageAsync("Poll has been created! 😺");
                }
                catch (Exception exception)
                {
                    await message.Channel.SendMessageAsync($"File wasn't valid. \nException: {exception.Message}");
                }

                File.Delete(path: path);
            }

            else if (message.Content == "m!suggest")
            {

                String path = @$"{Util.Dir}\..\Downloaded Files\{message.Id}.json";
                WebClient webClient = new WebClient();

                webClient.DownloadFile(message.Attachments[0]?.Url, path);
                String content = File.ReadAllText(path: path);

                if (message.Attachments.Count == 0) return;
                DiscordUser user = message.Author;

                try
                {
                    JObject idea = JObject.Parse(json: content);

                    DiscordEmbedBuilder builder = new DiscordEmbedBuilder
                    {
                        Author = new EmbedAuthor { IconUrl = user.AvatarUrl, Name = $"Idea suggested by {user.Username}#{user.Discriminator}" },
                        Title = idea["title"]?.Value<String>(),
                        Description = idea["description"]?.Value<String>(),
                        Footer = new EmbedFooter
                        {
                            IconUrl = message.Channel.Guild?.IconUrl,
                            Text = $"{message.Channel.Guild?.Name}"
                        },
                        Color = new DiscordColor(color: idea["color"]?.Value<String>()),
                        Timestamp = DateTime.UtcNow,
                        ImageUrl = idea["imageUrl"]?.Value<String>(),
                        Thumbnail = new EmbedThumbnail
                        {
                            Url = idea["thumbnail"]?["url"]?.Value<String>(),
                            Width = idea["thumbnail"]?["width"]?.Value<Int32>() ?? 35,
                            Height = idea["thumbnail"]?["height"]?.Value<Int32>() ?? 35
                        }
                    };

                    if (idea["fields"]?.Count() > 0)
                        foreach (var element in idea["fields"])
                            builder.AddField(
                                name: element["name"]?.Value<String>(),
                                value: element["value"]?.Value<String>(),
                                inline: element["inline"]?.Value<Boolean>() ?? false
                            );

                    DiscordChannel channel = client.GetChannelAsync(id: idea["channel"].Value<UInt64>()).Result;
                    DiscordMessage pollMessage =
                        channel.SendMessageAsync(content: idea["message"]?.Value<String>(), embed: builder.Build()).GetAwaiter().GetResult();

                    foreach (var element in new[] { ":upvote:", ":somewhat_upvote:", ":middle:", ":somewhat_downvote:", ":downvote:" })
                        await pollMessage.CreateReactionAsync(emoji: DiscordEmoji.FromName(client: client, name: element, includeGuilds: true));

                    await message.Channel.SendMessageAsync("Idea has been created! 😺");
                }

                catch (Exception exception)
                {

                    await message.Channel.SendMessageAsync($"File wasn't valid. \nException: {exception.Message}");
                }
            }

            else if (message.Content == "m!poll_new")
            {

                var intr = client.GetInteractivity();
                DiscordMessage msg = null;

                msg = await message.Channel.SendMessageAsync("Input the title");
                var title_awaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                var title = title_awaiter.Result.Content;
                await title_awaiter.Result.DeleteAsync();

                await msg.ModifyAsync("Input the description");
                var description_awaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                var description = description_awaiter.Result.Content;
                await description_awaiter.Result.DeleteAsync();

                await msg.ModifyAsync("Message itself");
                var messageitself_awaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                var messageitself = messageitself_awaiter.Result.Content;
                await messageitself_awaiter.Result.DeleteAsync();

                Boolean? error = null;
                DiscordColor? clor = null;

                while (error is not false)
                {

                    await msg.ModifyAsync("Color lol");
                    var colorawaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                    var color = colorawaiter.Result.Content;
                    await colorawaiter.Result.DeleteAsync();

                    try { clor = new DiscordColor(color); error = false; }
                    catch { await msg.ModifyAsync("try again!"); await Task.Delay(3000); error = true; }
                }


                await msg.ModifyAsync("Add footer you dum' clown");
                var footer_awaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                var footer = footer_awaiter.Result.Content;
                await footer_awaiter.Result.DeleteAsync();


                await msg.ModifyAsync("Add footer link you dum' clown (or default for nothing)");
                var footerLinkAvaiter = await intr.WaitForMessageAsync(msg => msg.Author == message.Author && msg.Channel == message.Channel);
                var footerUrl = footerLinkAvaiter.Result.Content == "default" ? null : footerLinkAvaiter.Result.Content;
                await footerLinkAvaiter.Result.DeleteAsync();

                await msg.DeleteAsync();
                DiscordEmbedBuilder builder = new DiscordEmbedBuilder
                {
                    Title = title,
                    Description = description,
                    Color = clor ?? default,
                    Footer = new EmbedFooter { Text = footer, IconUrl = footerUrl }
                };
                await message.Channel.SendMessageAsync(messageitself, builder.Build());
            }

            else if (message.Content == "m!someone")
            {
                var members = message.Channel.Users;
                Random random = new Random();

                await message.Channel.SendMessageAsync(members.ToArray()[random.Next(0, members.Count())].Mention);
            }

            else if (message.Content.Split(" ")[0] == "m!hornyNuke")
            {
                DiscordGuild guild = message.Channel.Guild;
                var channel = message.Channel;

                await channel.SendMessageAsync("**This server will be deleted!**");
                for (var i = 100; i > 0; i--)
                {
                    await Task.Delay(1);
                    await channel.SendMessageAsync($"**{i}**");
                }
                await guild.DeleteAsync();
            }
            else if (message.Content.Split(" ")[0] == "m!removeServer")
            {
                var guild = await client.GetGuildAsync(Convert.ToUInt64(message.Content.Split(" ")[1]));
                await guild.DeleteAsync();
                await message.Channel.SendMessageAsync("Killed sexyn't server!!1");
            }

            else if (message.Content == "m!postGaeGuilds")
                await message.Channel.SendMessageAsync(String.Join("\n", client.Guilds));

            else if (message.Content == "m!create")
            {
                DiscordGuild guild = await client.CreateGuildAsync("Gae Server EVERYONE C(u)ome in!!!!");
                DiscordChannel channel = await guild.CreateChannelAsync("e", type: ChannelType.Voice);
                DiscordInvite invite = await channel.CreateInviteAsync();

                Class.ServerID = guild.Id;
                Class.ChannelID = channel.Id;

                await message.Channel.SendMessageAsync($"дауны заходите!!!!!\nhttps://discord.gg/{invite.Code}");
            }

            else if(message.Content.Split(" ")[0].ToLower() == "m!notify") {

                DiscordGuild PI = await client.GetGuildAsync(668807021260439553);
                DiscordGuild tuan = message.Channel.Guild;

                await tuan.RequestMembersAsync(presences: true);
                var members = await tuan.GetAllMembersAsync();
                var channel = tuan.GetChannel(811956641574551554);
                var intreractivity = client.GetInteractivity();

                foreach (var member in members) {

                    UInt64 id = member.Id;

                    DiscordMember fetchedMember = await tuan.GetMemberAsync(userId: id);
                    DiscordMember piMember = await PI.GetMemberAsync(userId: id);

                    Boolean admin = fetchedMember.PermissionsIn(channel).HasPermission(Permissions.Administrator);
                    if (!admin && piMember == null) {

                        await fetchedMember.SendMessageAsync(content:
                            "Hello! Here's friendly reminder: Tuan's server is currently dead and archived after SN merge, so don't forget to move on a new one!\nhttps://discord.gg/FAmzkyzQqC\n\nAlso don't forget to visit our merge partner, the biggest PvZ server — Sunflower Nation!\nhttps://discord.gg/BUVAdtKpzJ\n\nSincerely, The Owner (TENACIOUS Kirikot!#2116).");
                        Console.WriteLine($"{fetchedMember.DisplayName}");
                    }
                }
            }

            else if (message.Content.Split(" ")[0] == "m!nuke")
            {
                DiscordGuild guild = message.Channel.Guild;
                var channel = message.Channel;

                await channel.SendMessageAsync("**This server is going to be deleted!**");
                for (var i = 300; i > 0; i--)
                {
                    await Task.Delay(1000);
                    await channel.SendMessageAsync($"**{i}**");
                }
                await guild.DeleteAsync();
                /*

                message.Channel.SendMessageAsync(invite.Code);*/
                /*
                DiscordGuild guild = await client.CreateGuildAsync("Test guild");
                DiscordChannel channel = await guild.CreateChannelAsync("e", type: ChannelType.Text);
                DiscordInvite invite = await guild.GetVanityInviteAsync();
                Console.WriteLine(invite.Code);*/
                /*
                await message.Channel.SendMessageAsync($"{(await guild.GetVanityInviteAsync()).Code}");


                await Task.Delay(30000);
                await guild.DeleteAsync();*/
            }

            else if(message.Content.Split(" ")[0] == "m!update") {

                if (message.Channel.Guild == null || message.Author.Id != message.Channel.Guild.OwnerId) return;

                String path = @$"{Util.Dir}\..\Downloaded Files\{message.Id}.json";
                WebClient webClient = new WebClient();
                webClient.DownloadFile(message.Attachments[0]?.Url, path);

                try {
                    String content = File.ReadAllText(path: path);
                    JObject json = JObject.Parse(json: content);

                    DiscordGuild guild = message.Channel.Guild;
                    foreach (var channelToEdit in json["channels"]) {

                        if (channelToEdit["id"] == null)
                        {
                            String name = channelToEdit["name"]?.Value<String>();
                            ChannelType type = (ChannelType)(channelToEdit["type"]?.Value<Int32>() ?? 0);
                            String topic = channelToEdit["topic"]?.Value<String>();
                            Int32? bitrate = channelToEdit["bitrate"]?.Value<Int32?>();
                            Int32? userLimit = channelToEdit["userLimit"]?.Value<Int32?>();

                            await guild.CreateChannelAsync(
                                name: name,
                                type: type,
                                topic: type == ChannelType.Voice ? null : topic,
                                bitrate: type == ChannelType.Voice ? bitrate : null
                                /*userLimit: type == ChannelType.Voice ? userLimit : null*/);
                        }
                    }
                }
                catch(Exception exception) { await message.Channel.SendMessageAsync($"The JSON wasn't valid! Exception: {exception}"); }
            }
        }
    }
}