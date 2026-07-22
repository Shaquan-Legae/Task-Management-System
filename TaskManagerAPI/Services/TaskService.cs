using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public class TaskService
    {
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;

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

            Console.WriteLine($"Added task: {task.Title}");
            Console.WriteLine($"Total tasks: {_tasks.Count}");

            return task;
        }

        public List<TaskItem> GetAllTasks()
        {
            Console.WriteLine($"Returning {_tasks.Count} task(s)");
            return _tasks;
        }

        public bool CompleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                return false;
            }

            task.Completed = true;

            Console.WriteLine($"Completed task: {task.Title}");

            return true;
        }
    }
}