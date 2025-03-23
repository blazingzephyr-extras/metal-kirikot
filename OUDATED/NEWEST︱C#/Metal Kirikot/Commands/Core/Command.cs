using System;

using DSharpPlus;
using MetalKirikot.Utilities;

namespace MetalKirikot.Commands.Core {

    //Data type representing custom command
    public struct Command {

        //Type's properties
        public String Name { get; init; }
        public CommandGroup Group { get; init; }
        public Collection<String> Usage { get; init; }
        public CommandAcccess Access { get; init; }
        public CommandCooldown Cooldown { get; init; }
        public Collection<Permissions> RequiredPermissions { get; init; }
        public Action<CommandEventArgs> Execute { get; init; }

        public Command (String name,
                        CommandGroup group,
                        Collection<String> usage,
                        CommandAcccess access,
                        CommandCooldown cooldown,
                        Action<CommandEventArgs> execute,
                        Collection<Permissions> requiredPermissions = null) 

            => (Name, Group, Usage, Access, Cooldown, RequiredPermissions, Execute)
            = (name, group, usage, access, cooldown, requiredPermissions ?? new (), execute);
    }
}