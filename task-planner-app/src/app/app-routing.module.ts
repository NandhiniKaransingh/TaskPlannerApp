import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
