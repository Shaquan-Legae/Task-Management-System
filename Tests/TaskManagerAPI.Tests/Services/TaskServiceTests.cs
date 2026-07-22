using TaskManagerAPI.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Tests.Services;

public class TaskServiceTests
{
    [Fact]
    public void AddTask_ShouldCreateTaskAndStoreItInMemory()
    {
        var service = new TaskService();
        var request = new CreateTaskRequest
        {
            Title = "Test Task",
            Priority = "High"
        };

        var result = service.AddTask(request);

        Assert.NotNull(result);
        Assert.Equal("Test Task", result.Title);
        Assert.Equal("High", result.Priority);
        Assert.False(result.Completed);

        var storedTasks = service.GetAllTasks();
        Assert.Single(storedTasks);
        Assert.Same(result, storedTasks[0]);
    }

    [Fact]
    public void CompleteTask_ShouldMarkExistingTaskAsCompletedAndReturnIt()
    {
        var service = new TaskService();
        var request = new CreateTaskRequest
        {
            Title = "Test Task",
            Priority = "High"
        };

        var createdTask = service.AddTask(request);

        var completedTask = service.CompleteTask(createdTask.Id);

        Assert.NotNull(completedTask);
        Assert.True(completedTask.Completed);
        Assert.Equal(createdTask.Id, completedTask.Id);
    }
}
