using System;
using System.IO;

namespace MetalKirikot.Utilities {

    //Small utility for storing different values
    public static class Utility {

        //String which represents current project's path and
        public static String Dir => Directory.GetCurrentDirectory().Replace(@$"\bin\Debug\net5.0", "");
        public static String ConfigPath => @$"{Dir}\Config.json";

        //Dynamic object representing bot configuration
        public static dynamic Json { get; set; }

        //Dynamic array representing bot's text
        public static dynamic[] BotStrings { get; set; } = new dynamic[3];
    }
}