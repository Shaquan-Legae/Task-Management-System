import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit, OnDestroy {

  tasks: Task[] = [];

  private refreshSubscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

    this.loadTasks();

    this.refreshSubscription = this.taskService.refresh$.subscribe(() => {
      this.loadTasks();
    });

  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: (err: unknown) => {
        console.error(err);
      }
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe();
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}