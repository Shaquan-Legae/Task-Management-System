import { Component, OnDestroy, OnInit } from '@angular/core';
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
  isLoading: boolean = false;
  errorMessage: string = '';

  private tasksSubscription!: Subscription;
  private refreshSubscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Subscribe to the tasks BehaviorSubject to automatically update when tasks change
    this.tasksSubscription = this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.errorMessage = '';
    });

    // Subscribe to refresh events and reload tasks when triggered
    this.refreshSubscription = this.taskService.refresh$.subscribe(() => {
      this.loadTasks();
    });

    // Load tasks from the backend on component initialization
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.taskService.loadTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error('Error loading tasks:', err);
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe({
      error: (err: unknown) => {
        console.error('Error completing task:', err);
        this.errorMessage = 'Failed to complete task. Please try again.';
      }
    });
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
    this.refreshSubscription?.unsubscribe();
  }
}