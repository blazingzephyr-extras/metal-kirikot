using System;

namespace MetalKirikot.Commands.Core {

    public enum CommandCooldownBucketType : Byte {
        User = 0,
        Channel = 1,
        Guild = 2,
        Global = 3
    }
}