import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  title = '';
  priority: 'High' | 'Medium' | 'Low' = 'Medium';

  constructor(private taskService: TaskService) {}

  addTask(): void {

    if (!this.title.trim()) {
      return;
    }

    this.taskService.addTask({
      id: 0,
      title: this.title,
      priority: this.priority,
      completed: false
    }).subscribe({
      next: () => {
        this.title = '';
        this.priority = 'Medium';
      },
      error: (err: unknown) => {
        console.error('Failed to add task:', err);
      }
    });

  }

}