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
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';

    // Validate input
    if (!this.title.trim()) {
      this.errorMessage = 'Please enter a task title.';
      return;
    }

    if (this.title.trim().length < 3) {
      this.errorMessage = 'Task title must be at least 3 characters long.';
      return;
    }

    this.isSubmitting = true;

    // Call the service to add the task
    this.taskService.addTask({
      id: 0,
      title: this.title.trim(),
      priority: this.priority,
      completed: false
    }).subscribe({
      next: (createdTask) => {
        // Clear form after successful submission
        this.title = '';
        this.priority = 'Medium';
        this.isSubmitting = false;
        this.successMessage = `Task "${createdTask.title}" added successfully!`;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: unknown) => {
        console.error('Failed to add task:', err);
        this.isSubmitting = false;
        
        // Provide user-friendly error message
        if (err instanceof Error) {
          this.errorMessage = `Failed to add task: ${err.message}`;
        } else {
          this.errorMessage = 'Failed to add task. Please try again.';
        }
      }
    });
  }
}