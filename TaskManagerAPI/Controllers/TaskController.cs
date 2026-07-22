using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: /tasks
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _taskService.GetAllTasks();

            return Ok(tasks);
        }

        // POST: /tasks
        [HttpPost]
        public IActionResult AddTask(CreateTaskRequest request)
        {
            var task = _taskService.AddTask(request);

            return CreatedAtAction(
                nameof(GetAllTasks),
                new { id = task.Id },
                task
            );
        }

        // PUT: /tasks/1
        [HttpPut("{id}")]
        public IActionResult CompleteTask(int id)
        {
            var task = _taskService.CompleteTask(id);

            if (task == null)
            {
                return NotFound($"Task with ID {id} was not found.");
            }

            return Ok(task);
        }
    }
}