import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'https://task-management-system-d5u7.onrender.com/tasks';

  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((tasks) => this.tasksSubject.next(tasks))
    );
  }

  loadTasks(): Observable<Task[]> {
    return this.getTasks();
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap((createdTask) => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([
          ...currentTasks,
          createdTask
        ]);
      })
    );
  }

  completeTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {}).pipe(
      tap((updatedTask) => {
        const currentTasks = this.tasksSubject.getValue();

        const nextTasks = currentTasks.map((task) =>
          task.id === id
            ? { ...task, ...updatedTask, completed: true }
            : task
        );

        this.tasksSubject.next(nextTasks);
      })
    );
  }
}