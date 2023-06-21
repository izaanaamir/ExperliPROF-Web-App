import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { AboutLessonsComponent } from './about-lessons/about-lessons.component';

const routes: Routes = [
  {
    path: 'all-lessons',
    component: AllLessonsComponent,
  },
  {
    path: 'about-lessons',
    component: AboutLessonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsRoutingModule {}
