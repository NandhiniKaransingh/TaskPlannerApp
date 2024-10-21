import { Component } from '@angular/core';
import { Task } from '../core/models/task';
import { TaskService } from '../core/services/task.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  showTaskModal: boolean = false;
  task: Task = { id: 0, name: '', description: '', date: '', priority: 'High' };
  calendarOptions: CalendarOptions;
  events: any[] = [];
  loading: boolean = true; 
  priorityOptions: SelectItem[] = []

  constructor(private taskService: TaskService) {}

  ngOnInit() {

    this.priorityOptions = [
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' }
    ];

    setTimeout(() => {

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        editable: true, 
        events: this.events,
        eventClick: this.handleEventClick.bind(this),
        eventDrop: this.handleEventDrop.bind(this),
        eventContent: this.renderEventContent.bind(this),
      };
      // Subscribe to tasks and update events in FullCalendar
      this.taskService.tasks$.subscribe((tasks) => {
        this.events = tasks.map((task) => ({
          title: task.name,
          date: task.date,
          id: task.id,
          description: task.description,
          priority: task.priority
        }));
        this.updateEvents(tasks);
      });

      this.loading = false;

    },2000)
  
  }

  handleDateClick(arg: any) {

    const tasksOnSelectedDate = this.taskService
      .getTasks()
      .filter((t) => t.date === arg.dateStr);

    if (tasksOnSelectedDate.length > 0) {
      this.task = { ...tasksOnSelectedDate[0] };
      this.showTaskModal = true;
    } else {
      this.task.date = arg.dateStr;
      this.task.id = 0;
      this.showTaskModal = true;
    }
  }

  saveTask() {
    if (this.task?.name) {
      if (this.task.id === 0) {
      
        this.taskService.addTask(
          this.task.name,
          this.task.description,
          this.task.date,
          this.task.priority
        );
      } else {
        // Update an existing task
        this.taskService.updateTask(this.task);
      }
    }
  

    this.showTaskModal = false;
    this.resetTask();
  }

  // Handle drag-and-drop updates

  handleEventDrop(event: any) {
    const newDate = event.event.start.toISOString().split('T')[0];
    const taskId = event.event.id;
    console.log('Task ID:', taskId);
    console.log('All Tasks:', this.taskService.getTasks());

    const task = this.taskService.getTasks().find((t) => t.id === +taskId);

    if (!task) {
      console.error('Task not found!', taskId);
      return;
    }

    // Update task with new date
    const updatedTask = { ...task, date: newDate };


    this.taskService.updateTask(updatedTask);
  }

  handleEventClick(event: any) {
    const task = this.taskService
      .getTasks()
      .find((t) => t.id === event.event.id);
    if (task) {
      this.task = { ...task };
      this.showTaskModal = true;
    }
  }

  renderEventContent(arg: any) {
    // Return HTML content for the event
    return {
      html: `
        <div>
          <strong>${arg.event.title}</strong>
          <p>${arg.event.extendedProps.description}</p>
          <p>Priority: ${arg.event.extendedProps.priority}</p>
        </div>
      `
    };
  }

  deleteTask(eventId: number) {
    this.taskService.deleteTask(eventId);
    this.showTaskModal = false;
    this.resetTask();
  }

  closeDialog() {
    this.showTaskModal = false;
    this.resetTask();
  }

  resetTask() {
    this.task = { id: 0, name: '', description: '', date: '' , priority: 'High'};
  }

  // Helper method to update events in FullCalendar
  private updateEvents(tasks: Task[]) {
    const events = tasks.map((task) => ({
      title: task.name,
      date: task.date,
      description: task.description,
      priority: task.priority,
      id: task.id,
    }));
    this.events = events;

    this.calendarOptions.events = this.events;
  }
}
