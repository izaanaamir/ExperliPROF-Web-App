import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { LecturesComponent } from './lectures/lectures.component';
import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'lectures',
    component: LecturesComponent,
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
  },
  {
    path: 'exam-schedule',
    component: ExamScheduleComponent,
  },
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.module').then((m) => m.FeesModule),
  },

  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'grades',
    loadChildren: () =>
      import('./grades/grades.module').then((m) => m.GradesModule),
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./lessons/lessons.module').then((m) => m.LessonsModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
