namespace TodoApp.Server.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Task { get; set; } = string.Empty;
        public DateTime DueDateTime { get; set; } = DateTime.Today;
    }
}
