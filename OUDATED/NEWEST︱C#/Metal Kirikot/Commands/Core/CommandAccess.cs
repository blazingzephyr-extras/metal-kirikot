
using System;

namespace MetalKirikot.Commands.Core {

    public struct CommandAcccess {

        public Boolean AvaibleForAlpha { get; init; }
        public CommandAccessLevel AccessLevel { get; init; }

        public CommandAcccess(Boolean avaibleForAlpha, CommandAccessLevel accessLevel) => (AvaibleForAlpha, AccessLevel) = (avaibleForAlpha, accessLevel);
    }
}