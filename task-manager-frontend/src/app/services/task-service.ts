import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5236/tasks';

  private refreshSource = new Subject<void>();

  refresh$ = this.refreshSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.refreshSource.next())
    );
  }

  completeTask(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {}).pipe(
      tap(() => this.refreshSource.next())
    );
  }
}