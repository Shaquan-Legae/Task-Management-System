using TaskManagerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<TaskService>();

// Register CORS BEFORE builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy.WithOrigins("http://localhost:4200",
                           "https://task-management-system-1-hlhy.onrender.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS before authorization and mapping controllers
app.UseCors("Angular");

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "API is running");

app.Run("http://0.0.0.0:8080");
