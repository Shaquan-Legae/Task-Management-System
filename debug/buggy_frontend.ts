import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  template: `
    <div *ngFor="let task of tasks">
      {{ task.title }} - {{ task.priority }}
      <button (click)="completeTask(task.id)">Complete</button>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  // Fixed: Added explicit return type
  ngOnInit(): void {
    this.loadTasks();
  }

  // Fixed: Added explicit return type and typed the GET response
  loadTasks(): void {
    this.http.get<any[]>('/tasks').subscribe((data) => {
      this.tasks = data;
    });
  }

  // Fixed: Changed GET to PUT and corrected the endpoint
  completeTask(id: number): void {
    this.http.put(`/tasks/${id}`, {}).subscribe(() => {
      this.loadTasks();
    });
  }
}