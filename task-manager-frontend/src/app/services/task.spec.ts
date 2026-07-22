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

  it('should add a task through the API', () => {
    const task: Task = {
      id: 1,
      title: 'Write tests',
      priority: 'High',
      completed: false
    };

    let createdTask: Task | undefined;

    service.addTask(task).subscribe((response) => {
      createdTask = response;
    });

    const req = httpMock.expectOne('http://localhost:5236/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(task);

    expect(createdTask).toEqual(task);
  });
});
