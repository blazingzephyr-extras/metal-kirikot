using System;

using DSharpPlus.Entities;
using Metal_Kirikot.Clients;

namespace Metal_Kirikot_Alpha {

    internal class AlphaClient : Client {

        public override String BotType => "alpha";
        protected override String Activity 
            => $"version {_config["version"]["global"]}." +
                 $"{_config["version"]["montly"]}." +
                 $"{_config["version"]["current"]}! 😸";
        protected override UserStatus UserStatus => UserStatus.Idle;

        protected override void OnAwake() {

        }
    }
}