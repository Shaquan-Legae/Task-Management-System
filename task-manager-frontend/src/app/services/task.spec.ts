import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Task } from '../models/task';
import { TaskService } from './task-service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a task through the API and publish the updated task list', () => {
    const task: Task = {
      id: 1,
      title: 'Write tests',
      priority: 'High',
      completed: false
    };

    let createdTask: Task | undefined;
    let cachedTasks: Task[] = [];

    service.tasks$.subscribe((tasks) => {
      cachedTasks = tasks;
    });

    service.addTask(task).subscribe((response) => {
      createdTask = response;
    });

    const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.endsWith('/tasks'));
    expect(req.request.method).toBe('POST');
    req.flush(task);

    expect(createdTask).toEqual(task);
    expect(cachedTasks).toEqual([task]);
  });

  it('should mark a task as completed in the cached state', () => {
    const initialTasks: Task[] = [
      {
        id: 1,
        title: 'Draft task',
        priority: 'Medium',
        completed: false
      }
    ];

    let cachedTasks: Task[] = [];

    service.tasks$.subscribe((tasks) => {
      cachedTasks = tasks;
    });

    service.loadTasks().subscribe();

    const loadRequest = httpMock.expectOne((request) => request.method === 'GET' && request.url.endsWith('/tasks'));
    loadRequest.flush(initialTasks);

    service.completeTask(1).subscribe();

    const completeRequest = httpMock.expectOne((request) => request.method === 'PUT' && request.url.endsWith('/tasks/1'));
    completeRequest.flush({
      ...initialTasks[0],
      completed: true
    });

    expect(cachedTasks[0].completed).toBe(true);
  });
});
