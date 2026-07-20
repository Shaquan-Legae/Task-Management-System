using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public class TaskService
    {
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;

        // Creates a new task and adds it to the list
        public TaskItem AddTask(CreateTaskRequest request)
        {
            TaskItem task = new TaskItem
            {
                Id = _nextId++,
                Title = request.Title,
                Priority = request.Priority,
                Completed = false
            };

            _tasks.Add(task);

            return task;
        }

        // Returns all tasks
        public List<TaskItem> GetAllTasks()
        {
            return _tasks;
        }

        // Marks a task as completed
        public bool CompleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                return false;
            }

            task.Completed = true;

            return true;
        }

    }
}