import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../core/services/task.service';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
}

interface Day {
  date: Date | null;
  tasks: Task[];
}

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss'
})
export class CustomCalendarComponent {

  displayDialog: boolean = false;
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysInMonth: any[] = [];
  taskForm: FormGroup;
  selectedDay: any = null;
  selectedTaskId: number | null = null; 
  currentDate: Date = new Date();

  // Priority dropdown options
  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' }
  ];
  selectedMonth: Date | number;

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      date: ['']
    });
  }

  ngOnInit() {
    this.generateDaysInMonth();
    this.setSelectedDay();
    console.log(this.currentDate)
    this.selectedMonth = this.currentDate
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date && 
      date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear();
  }

  generateDaysInMonth() {
    const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push({ date: null, tasks: [] });
    }


    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i), tasks: [] });
    }

    this.daysInMonth = days;
    this.setSelectedDay();
    console.log(this.currentDate)
}

  openDialog(day, taskId: number | null = null) {
    if (!day.date) return;
    
    this.displayDialog = true;
    this.selectedDay = day;
    
    this.taskForm.reset();
    this.taskForm.patchValue({
      date: this.formatDate(day.date), // Display formatted date in the disabled input field
      title: taskId !== null ? day.tasks.find(t => t.id === taskId)?.title : '',
      description: taskId !== null ? day.tasks.find(t => t.id === taskId)?.description : '',
      priority: taskId !== null ? day.tasks.find(t => t.id === taskId)?.priority : '',
    });
    
    this.selectedTaskId = taskId;
  }
  

  saveTask() {
    const newTask = {
      id: this.selectedTaskId !== null ? this.selectedTaskId : Date.now(),
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
    };

    if (this.selectedTaskId !== null) {
      // Update existing task
      const taskIndex = this.selectedDay.tasks.findIndex(task => task.id === this.selectedTaskId);
      if (taskIndex > -1) {
        this.selectedDay.tasks[taskIndex] = newTask;
      }
    } else {
      // Add new task
      this.selectedDay.tasks.push(newTask);
    }

    this.displayDialog = false;
  }

  deleteTask() {
    if (this.selectedTaskId !== null) {
      this.selectedDay.tasks = this.selectedDay.tasks.filter(task => task.id !== this.selectedTaskId);
      this.selectedTaskId = null; // Reset the selected task ID
      this.displayDialog = false; // Close dialog after deletion
    }
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedTaskId = null;
  }

  setSelectedDay() {
    const todayDate = new Date();
    const todayDay = this.daysInMonth.find(day => day.date?.getDate() === todayDate.getDate() &&
      day.date?.getMonth() === todayDate.getMonth() &&
      day.date?.getFullYear() === todayDate.getFullYear());
      if (todayDay) {
        this.selectedDay = todayDay; 
        this.taskForm.patchValue({ date: this.formatDate(todayDay.date) });
    }
  }
  goToPreviousMonth() {
    this.selectedMonth = this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateDaysInMonth();
    this.cdr.detectChanges();
  }

  goToNextMonth() {
    this.selectedMonth = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateDaysInMonth();
    this.cdr.detectChanges(); 
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-IN', options);
  }
}
