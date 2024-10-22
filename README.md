# TaskPlannerApp

TaskPlanner - Calendar Components
This project contains two distinct calendar implementations for managing tasks within a dynamic to-do list integrated with a calendar view. These implementations include a Custom Calendar Component and a FullCalendar Component. Both components allow users to view, add, update, and delete tasks on specific dates.

1. Custom Calendar Component
Overview
The Custom Calendar Component is a manually built calendar that enables users to view a specific month, navigate between months, and interact with tasks assigned to particular dates. 

It includes the ability to:

1. View tasks on a specific date.
2. Add new tasks by clicking on a date.
3. Edit or delete tasks within a dialog.
4. Navigate between months using "Previous" and "Next" buttons.

Features:

1. Month Navigation: Navigate through months using the provided buttons.
2. Task Management: Users can add, edit, or delete tasks on any given day.
3. Task Priority: Tasks can be assigned a priority (Low, Medium, High).
4. Date Picker: The task date is automatically set based on the selected day, and it's displayed as a read-only field within the dialog.
5. Form Validation: Task name and priority are required fields, and the Save button is disabled until the form is valid.
Implementation
6. Calendar Grid: A custom grid layout was created using *ngFor loops to generate the days of the current month dynamically, including empty spaces for days that do not belong to the current month.
7. Task Dialog: A PrimeNG p-dialog is used to open a modal where users can input task details. It features form validation, and the task date is disabled to prevent editing.

Technologies Used

1. Angular Forms (FormBuilder, FormGroup)
2. PrimeNG Dialog (p-dialog)
3. Custom CSS for styling the calendar grid


FullCalendar Component:

Overview:

The FullCalendar Component is an integration of the FullCalendar library into the project. It provides a more advanced, out-of-the-box calendar experience with additional features such as drag-and-drop functionality, dynamic event creation, and event updates.

Features:
1. Event Creation: Users can click on any date to create a new task.
2. Task Management: Tasks are added, updated, or deleted via a modal dialog.
3. Drag-and-Drop: Tasks can be dragged from one date to another directly on the calendar.
4. Event Rendering: Tasks (or "events") are rendered as entries on the selected dates.

Implementation:

1. FullCalendar Integration: FullCalendar was integrated into the project to provide a rich user experience for the calendar view.
2. Event Click: Clicking on an event opens a modal dialog where users can view and edit task details.
3. Date Click: Clicking on any empty date opens a modal dialog to add a new task.
4. Drag-and-Drop: FullCalendar's built-in drag-and-drop feature was enabled to allow users to move tasks between dates visually.
Customizations
5. Task Dialog: Similar to the custom component, PrimeNG's p-dialog was used for the task creation and editing modal.
6. To use FullCalendar component, route to http://localhost:4200/calendar

Technologies Used:

1. FullCalendar for the calendar.
2. Angular Forms (FormBuilder, FormGroup) for task management.
3. PrimeNG Dialog (p-dialog) for displaying task details.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
