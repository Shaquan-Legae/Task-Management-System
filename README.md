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

```
TaskManager/
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   └── Program.cs
│
├── Frontend/
│   ├── src/
│   ├── components/
│   └── services/
│
├── DEBUG_NOTES.txt
├── answers.txt
└── README.md
```

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

```
GET /tasks
```

Returns all available tasks.

### Create Task

```
POST /tasks
```

Example request:

```json
{
  "title": "Complete assessment",
  "priority": "High"
}
```

**Validation:**
- Title cannot be empty
- Priority must be High, Medium, or Low

### Complete Task

```
PUT /tasks/{id}
```

Marks a task as completed.

Example:

```
PUT /tasks/1
```

## Installation Requirements

Before running the project, install:

- .NET SDK
- Node.js
- Angular CLI
- Git

Verify installations:

```bash
dotnet --version
node -v
ng version
git --version
```

## Running the Backend

Navigate to the backend folder:

```bash
cd Backend
```

Restore dependencies:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

The backend API will start locally, e.g., `http://localhost:5236`.

## Running the Frontend

Navigate to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start Angular development server:

```bash
ng serve
```

The application will run at: `http://localhost:4200`

## Debugging Fixes

The original project contained intentional bugs in both frontend and backend files.

**Backend Fixes:**
- Added validation for task priority values
- Added handling for tasks that do not exist
- Prevented null reference errors when completing tasks
- Corrected task creation logic

**Frontend Fixes:**
- Changed incorrect API method from GET to PUT when completing tasks
- Updated API routes to match backend endpoints
- Improved task loading after updates

Detailed debugging notes are available in `DEBUG_NOTES.txt`.

## Testing

### Backend Testing
A unit test verifies that:
- A task can be successfully created
- The task is stored correctly

### Frontend Testing
A component test verifies that:
- Tasks are retrieved from the API
- Tasks are displayed correctly

## Development Approach

The application was developed by:

1. Understanding the required functionality
2. Setting up the .NET API and Angular environment
3. Implementing backend endpoints
4. Connecting Angular components using HttpClient
5. Debugging provided broken code
6. Adding basic tests
7. Documenting changes and solutions

## Future Improvements

Possible improvements:
- Replace in-memory storage with a database
- Add user authentication
- Add task editing and deletion
- Improve UI design
- Add automated API integration tests
