using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

using MetalKirikot.Clients;
using MetalKirikot.Utilities;
using Utf8Json;
using Bot = MetalKirikot.Clients.MetalKirikot;

namespace MetalKirikot {

    // Program class, bots' starting point.
    public static class Program {

        // Program's entry point.
        private static void Main() {

            //Reading configuration
            String file = File.ReadAllText(path: Utility.ConfigPath, encoding: Encoding.UTF8);
            Utility.Json = JsonSerializer.Deserialize<dynamic>(json: file);

            //Read BotStrings
            String[] languages = { "EN-US", "RU-RU", "IT-IT" };

            for(int i = 0; i < 3; i++) {

                String text = File.ReadAllText(path: $"{Utility.Dir}/Assets/BotStrings/{languages[i]}.json", encoding: Encoding.UTF8);
                dynamic json = ;
                Utility.BotStrings[i] = json;
            }

            //Initializing bots' clients.
            Bot alpha = new MetalKirikotAlpha(),
                omega = new MetalKirikotOmega();

            //Launching Omega.
            Task.Factory.StartNew(action: () => omega.Launch().GetAwaiter().GetResult());

            //Launching Alpha.
            alpha.Launch().GetAwaiter().GetResult();
        }
    }
}