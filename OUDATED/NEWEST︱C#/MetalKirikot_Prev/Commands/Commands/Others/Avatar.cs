
namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Class, representing utility for storing commands
    /// </summary>
    public static partial class CommandHandler {

        private static Command _avatar = new (
                name: "Avatar",
                group: CommandGroup.Other,
                usage: new("a", "avatar", "pp", "pfp", "profilepic", "profilepicture", "а", "ава", "аватар", "аватарка"),
                access: (BotAccess.OmegaOnly, ChannelAccessType.Everywhere, AccessLevel.BetaTesterOnly),
                cooldown: (CooldownBucketType.User, 3000),
                
                execute: async args => {

                    await args.Channel.SendMessageAsync(args.User.AvatarUrl);
                }
        );
    }
}