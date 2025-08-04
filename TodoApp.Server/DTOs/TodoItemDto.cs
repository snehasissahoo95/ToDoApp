namespace TodoApp.Server.DTOs
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        public string Task { get; set; } = string.Empty;
        public DateTime DueDateTime { get; set; } = DateTime.Today;
    }
}
