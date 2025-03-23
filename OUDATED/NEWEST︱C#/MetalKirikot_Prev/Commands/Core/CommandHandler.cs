using System;
using System.Linq;

namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Class, representing utility for storing commands
    /// </summary>
    public static partial class CommandHandler {

        private static Command[] _commands = { _avatar };

        /// <summary>
        /// Finds the existing command with provided codename
        /// </summary>
        /// <param name="usage" usage codename of command></param>
        /// <returns>Returns true and command if it exists, else returns false</returns>
        public static (Boolean exists, Command? command) Find(String usage) {
            try {
                return (true, _commands.First(command => command.Usage.Contains(item: usage)));
            }
            catch {
                return (false, null);
            }
        }
    }
}