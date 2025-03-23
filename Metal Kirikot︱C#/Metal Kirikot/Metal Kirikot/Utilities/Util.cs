using System;
using System.IO;

namespace Metal_Kirikot.Utilities {

    public static class Util {

        public static String Dir => Directory.GetCurrentDirectory().Replace(@$"\bin\Debug\net5.0", "");
        public static String ConfigPath => @$"{Dir}\..\Config.json";
    }
}