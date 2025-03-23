using System.Collections.ObjectModel;

namespace Metal_Kirikot.Utilities.Events {
    public class CommandGroup : Collection<Command> {
        string Name;
        string IsHidden;
    }
}