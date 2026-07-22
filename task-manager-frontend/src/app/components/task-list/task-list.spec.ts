import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskList } from './task-list';
import { TaskService } from '../../services/task-service';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
      providers: [
        {
          provide: TaskService,
          useValue: {
            tasks$: of([
              {
                id: 1,
                title: 'Test Task',
                priority: 'High',
                completed: false
              }
            ]),
            refresh$: of(undefined),
            loadTasks: () => of([
              {
                id: 1,
                title: 'Test Task',
                priority: 'High',
                completed: false
              }
            ]),
            completeTask: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks after retrieval', () => {
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test Task');

    const title = fixture.nativeElement.querySelector('h3');
    expect(title?.textContent).toContain('Test Task');
  });
});