using System;

namespace Metal_Kirikot_Omega {

    internal class Program {

        private static void Main() {

            OmegaClient client = new ();
            client.Launch().GetAwaiter().GetResult();
        }
    }
}
