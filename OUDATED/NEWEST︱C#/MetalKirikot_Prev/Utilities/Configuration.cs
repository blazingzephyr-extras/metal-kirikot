using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

using DSharpPlus;
using DSharpPlus.Entities;
using Microsoft.Extensions.Logging;

namespace MetalKirikot.Utilities {

    public class Configuration {

        public class VersionConfiguration {

            public class AlphaVersion {

                [DataMember(Name = "global")] public Byte Global { get; set; }
                [DataMember(Name = "monthly")]  public Byte Monthly { get; set; }
                [DataMember(Name = "content")]  public Int16 Content { get; set; }
            }

            [DataMember(Name = "alpha")]  public AlphaVersion Alpha { get; set; }
            [DataMember(Name = "omega")] public short Omega { get; set; }
        }

        public class ClientConfiguration {

            public class Token {

                [DataMember(Name = "alpha")] public String Alpha { get; set; }
                [DataMember(Name = "omega")] public String Omega { get; set; }

                public String this[String botType] => botType == "alpha" ? Alpha : Omega;
            }
            public class Presences {

                public class Presence {
                    [DataMember(Name = "activityType")]    public ActivityType ActivityType { get; set; }
                    [DataMember(Name = "userStatus")]      public UserStatus UserStatus { get; set; }
                }
                [DataMember(Name = "alpha")]                      public Presence Alpha { get; set; }
                [DataMember(Name = "omega")]                     public Presence Omega { get; set; }

                public Presence this[String botType] => botType == "alpha" ? Alpha : Omega;
            }

            [DataMember(Name = "autoReconnect")]       public Boolean AutoReconnect { get; set; }
            [DataMember(Name = "largeThreshold")]       public Int32 LargeThreshold { get; set; }
            [DataMember(Name = "logLevel")]                     public LogLevel LogLevel { get; set; }
            [DataMember(Name = "token")]                         public Token Tokens { get; set; }
            [DataMember(Name = "tokenType")]                public TokenType TokenType { get; set; }
            [DataMember(Name = "shardId")]                     public Int32 ShardId { get; set; }
            [DataMember(Name = "shardCount")]              public Int32 ShardCount { get; set; }
            [DataMember(Name = "messageCacheSize")] public Int32 MessageCacheSize { get; set; }
            [DataMember(Name = "dateTimeFormat")]      public String DateTimeFormat { get; set; }
            [DataMember(Name = "presence")]                  public Presences Presence { get; set; }
        }

        [DataMember(Name = "version")]                          public VersionConfiguration Version { get; set; }
        [DataMember(Name = "client")]                              public ClientConfiguration Client { get; set; }
        [DataMember(Name = "colors")]                            public Dictionary<String, DiscordColor> Colors { get; set; }
    }
}