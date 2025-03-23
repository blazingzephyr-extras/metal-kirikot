using MetalKirikot.Utilities;
using System;

namespace MetalKirikot.Clients {

    public class AlphaClient : BaseClient {

        protected override String BotType => "alpha";
        protected override String Activity 
            => $"version {Utility.Config.Version.Alpha.Global}.{Utility.Config.Version.Alpha.Global}.{Utility.Config.Version.Alpha.Global}! 😸";

        protected override void BeforeLaunch() {
        }
    }
}