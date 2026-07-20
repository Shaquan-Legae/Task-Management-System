namespace TaskManagerAPI.Models
{
    public class CreateTaskRequest
    {
        public string Title { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;
    }
}