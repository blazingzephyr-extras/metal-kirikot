using MetalKirikot.Commands.Core;

namespace MetalKirikot.Utilities.Commands.Commands {

    //Utility for handling commands
    public static partial class CommandHandler {

        //Command which gets user's avatar
        private static Command _avatar = new (
            name: "avatar",
            group: CommandGroup.Other,
            usage: new ("a", "avatar", "pp", "pfp", "profilepic", "profilepicture", "а", "ава", "аватар", "аватарка"),
            access: new (
                accessLevel: CommandAccessLevel.Everyone, 
                avaibleForAlpha: false
            ),
            cooldown: new (
                bucketType: CommandCooldownBucketType.User, 
                milliseconds: 3000
            ),

            execute: (CommandEventArgs args) => {

                args.Channel.SendMessageAsync("meow ~");
            }
        );
    }
}