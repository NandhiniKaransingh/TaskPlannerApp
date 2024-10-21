import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

const routes: Routes = [
  { path: 'custom-calendar', component: CustomCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
