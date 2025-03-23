using DSharpPlus;

namespace Metal_Kirikot.Utilities.Events {
    public class Command : DiscordEvent {
         public string[] Usage { get; set; }
         public CommandGroup CommandGroup { get; set; }
         public CommandType CommandType { get; set; }
         public Permissions[] RequiredPermissions { get; set; }
    }
}