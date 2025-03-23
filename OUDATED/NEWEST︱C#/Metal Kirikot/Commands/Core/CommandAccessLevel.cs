using System;

namespace MetalKirikot.Commands.Core {

    //Enumerator representing access level of command
    public enum CommandAccessLevel : SByte {
        BotOwnerOnly,
        BetaTestersOnly,
        GuildOwnerOnly, 
        GuildOnly,
        Everyone
    }
}