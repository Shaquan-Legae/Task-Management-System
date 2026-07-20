# Task Manager Application

A full-stack Task Manager web application built as part of a Full Stack Development Assessment.

The application allows users to:

- Create new tasks with a title and priority
- View existing tasks
- Mark tasks as completed
- Filter tasks by priority and completion status

## Tech Stack

### Backend

- C#
- .NET Web API
- In-memory data storage

### Frontend

- Angular
- TypeScript
- Angular HttpClient

## Project Structure
TaskManager/
│
├── Backend/
│ ├── Controllers/
│ ├── Models/
│ └── Program.cs
│
├── Frontend/
│ ├── src/
│ ├── components/
│ └── services/
│
├── DEBUG_NOTES.txt
├── answers.txt
└── README.md


## Features

### Task Management
- Add tasks with:
  - Title
  - Priority (High, Medium, Low)

- View all tasks

- Mark tasks as completed

- Filter tasks:
  - By priority
  - By completion status

## API Endpoints

### Get All Tasks
GET /tasks
Returns a list of all tasks in the system.

### Add Task
POST /tasks
Creates a new task with the specified title and priority.

### Complete Task
PUT /tasks/{id}
Marks the task with the specified ID as completed.

### Installation Requirements

Before running the project, install:

.NET SDK
Node.js
Angular CLI
Git

### Running the Backend

Navigate to the backend folder:

cd Backend

Restore dependencies:

dotnet restore

Run the API:

dotnet run

The backend API will start locally.

Example:

http://localhost:5236

### Running the Frontend

#### Navigate to the frontend folder:

cd Frontend

#### Install dependencies:

npm install

#### Start Angular development server:

ng serve

#### The application will run at:

http://localhost:4200

## Debugging Fixes

The project contained intentional bugs in both frontend and backend files.

#### The fixes included:

Backend Fixes
Added validation for task priority values
Added handling for tasks that do not exist
Prevented null reference errors when completing tasks
Corrected task creation logic
Frontend Fixes
Changed incorrect API method from GET to PUT when completing tasks
Updated API routes to match backend endpoints
Improved task loading after updates

#### Detailed debugging notes are available in:

DEBUG_NOTES.txt
Testing
Backend Testing

#### A unit test verifies that:

A task can be successfully created
The task is stored correctly
Frontend Testing

#### A component test verifies that:

Tasks are retrieved from the API
Tasks are displayed correctly
Development Approach

#### The application was developed by:

Understanding the required functionality
Setting up the .NET API and Angular environment
Implementing backend endpoints
Connecting Angular components using HttpClient
Debugging provided broken code
Adding basic tests
Documenting changes and solutions
Future Improvements

### Possible improvements:

Replace in-memory storage with a database
Add user authentication
Add task editing and deletion
Improve UI design
Add automated API integration tests

### Author
Kamogelo Legae