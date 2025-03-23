using System;
using System.Collections.Generic;
using System.IO;

namespace MetalKirikot.Utilities {

    /// <summary>
    /// Small utility for storing different values
    /// </summary>
    public static class Utility {

        /// <summary>
        /// String which represents current project's path
        /// </summary>
        public static String Dir => Directory.GetCurrentDirectory().Replace(@$"\bin\Debug\net5.0", "");

        /// <summary>
        /// String which represents configuration's path
        /// </summary>
        public static String ConfigPath => @$"{Dir}\Config.json";

        /// <summary>
        /// Configiration
        /// </summary>
        public static Configuration Config { get; set; }

        /// <summary>
        /// Configiration
        /// </summary>
        public static Dictionary<String, String>[] BotStrings { get; set; } = new Dictionary<string, string>[3];
    }
}