import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskId = 0;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  // Get current task list
  getTasks() {
    return this.tasksSubject.value;
  }

  // Add a new task
  addTask(taskName: string,taskDescription: string, taskDate: string, priority: string) {
    const newTask: Task = {
      id: ++this.taskId,
      name: taskName,
      description: taskDescription,
      date: taskDate,
      priority: priority
    };
    const currentTasks = this.getTasks();
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  // Update a task
  updateTask(updatedTask: Task) {
    const tasks = this.getTasks().map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next([...tasks]);

  }

  

  // Delete a task
  deleteTask(taskId: number) {
    const tasks = this.getTasks().filter(task => task.id !== taskId);
    this.tasksSubject.next(tasks);
  }
}
