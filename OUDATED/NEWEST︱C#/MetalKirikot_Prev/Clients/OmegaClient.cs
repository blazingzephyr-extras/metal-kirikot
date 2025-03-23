using DSharpPlus.Interactivity.Extensions;
using MetalKirikot.Utilities;
using System;
using System.IO;
using Utf8Json;
using EventHandler = MetalKirikot.Events.EventHandler;

namespace MetalKirikot.Clients {

    public class OmegaClient : BaseClient {

        protected override String BotType => "omega";
        protected override String Activity => $"build {Utility.Config.Version.Omega}! 😸";

        protected override void BeforeLaunch() {
            /*
            //Saving current settings with new build version

            */

            //Saving the updated configuration
            Utility.Config.Version.Omega++;
            String converted = JsonSerializer.ToJsonString(Utility.Config);
            String fixedStyle = JsonSerializer.PrettyPrint(json: converted);
            File.WriteAllText(path: Utility.ConfigPath, contents: fixedStyle);

            var interactivity = Client.GetInteractivity();

            interactivity.Poll

            //Events
            Client.Ready += async (discordClient, args) => EventHandler.Ready(client: Client, botType: BotType);
            Client.MessageCreated += async (discordClient, args) => EventHandler.MessageCreated(eventArgs: args, client: Client);
        }
    }
}
