using DSharpPlus.Entities;
using MetalKirikot.Utilities;
using System;
using System.IO;
using System.Threading.Tasks;

using Utf8Json;
using EventHandler = MetalKirikot.Events.EventHandler;

namespace MetalKirikot.Clients {

    //Class representing bot's testing account
    public class MetalKirikotOmega : MetalKirikot {

        protected override String BotType => "omega";

        //Action which occurs on bot's launch
        public override async Task Launch() {


            await Client.ConnectAsync(
                activity: new (name: $"build {Utility.Json["version"][BotType]}! 😸", type: ActivityType.Streaming),
                status: UserStatus.Online
            );
            await Task.Delay(-1);
        }
    }
}