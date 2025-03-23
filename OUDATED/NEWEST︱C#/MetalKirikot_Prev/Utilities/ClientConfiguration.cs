using System;
using System.Runtime.Serialization;

namespace MetalKirikot.Utilities {

    /// <summary>
    /// Data type, representing client configuration
    /// </summary>
    public struct ClientConfiguration {

        [DataMember(Name = "autoReconnect")]
        public Boolean AutoReconnect { get; set; }
    }
}