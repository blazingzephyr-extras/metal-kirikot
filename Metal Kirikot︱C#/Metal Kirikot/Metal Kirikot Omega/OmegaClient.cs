using DSharpPlus.Entities;
using Metal_Kirikot.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Metal_Kirikot_Omega {

    internal class OmegaClient : Client {

        public override String BotType => "omega";
        protected override String Activity => $"build {_config["version"]["build"]}!";
        protected override UserStatus UserStatus => UserStatus.Online;

        protected override void OnAwake() {

            Discord.MessageCreated += async (e, g) => {
                Console.WriteLine(g.Message.Content);
            };
        }
    }
}