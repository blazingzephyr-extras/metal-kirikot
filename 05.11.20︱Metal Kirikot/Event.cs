namespace Metal_Kirikot.Utilities.Events {
    public delegate void Event(EventArgs eventArgs);
    public class DiscordEvent {
        public string Name { get; set; }
        public Event Execute { get; set; }
    }
}