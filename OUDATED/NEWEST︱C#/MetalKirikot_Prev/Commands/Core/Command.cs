using System;
using DSharpPlus;
using MetalKirikot.Utilities;

namespace MetalKirikot.Commands.Core {

    /// <summary>
    /// Data type, representing command
    /// </summary>
    public struct Command {

        /// <summary>
        /// Command's name
        /// </summary>
        public String Name { get; init; }

        /// <summary>
        /// Group, which command belongs to
        /// </summary>
        public CommandGroup Group { get; init; }

        /// <summary>
        /// Command codenames, required for it to run
        /// </summary>
        public Collection<String> Usage { get; init; }

        /// <summary>
        /// Access level of command
        /// </summary>
        public CommandAccess Access { get; init; }
        
        /// <summary>
        /// Command's cooldown module
        /// </summary>
        public CommandCooldown Cooldown { get; init; }

        /// <summary>
        /// Permissions, required to run the command
        /// </summary>
        public Permissions RequiredPermissions { get; init; }

        /// <summary>
        /// Action, occuring on command's execution
        /// </summary>
        public Action<CommandContext> Execute { get; init; }

        public Command(String name,
                        CommandGroup group,
                        Collection<String> usage,
                        CommandAccess access,
                        CommandCooldown cooldown,
                        Action<CommandContext> execute,
                        Permissions requiredPermissions = Permissions.None)

            => (Name, Group, Usage, Access, Cooldown, RequiredPermissions, Execute)
            = (name, group, usage, access, cooldown, requiredPermissions, execute);
    }

    /// <summary>
    /// Enumerator, representing which command group command belongs to
    /// </summary>
    public enum CommandGroup : Byte {

        /// <summary>
        /// Off-topic command
        /// </summary>
        Other = 0
    }
}