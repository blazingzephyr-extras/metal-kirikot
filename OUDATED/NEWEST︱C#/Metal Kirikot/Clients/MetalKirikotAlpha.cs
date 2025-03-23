using DSharpPlus.Entities;
using MetalKirikot.Utilities;
using System;
using System.Threading.Tasks;


namespace MetalKirikot.Clients {

    //Class representing main bot's account
    public class MetalKirikotAlpha : MetalKirikot {

        protected override String BotType => "alpha";

        //Action which occurs on bot's launch
        public override async Task Launch() {

            //Initializing client's status
            dynamic botVersion = Utility.Json["version"][BotType];
            String version = $"";

            await Client.ConnectAsync(
                activity: new (name: version, type: ActivityType.Streaming),
                status: UserStatus.Idle
            );
            Client.CreateGuildAsync("", "", verificationLevel: VerificationLevel.Highest, defaultMessageNotifications: DefaultMessageNotifications.MentionsOnly);

            await Task.Delay(-1);
        }
    }
}