import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCourseComponent } from './all-course/all-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';

const routes: Routes = [
  {
    path: 'all-course',
    component: AllCourseComponent,
  },
  {
    path: 'about-course',
    component: AboutCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
