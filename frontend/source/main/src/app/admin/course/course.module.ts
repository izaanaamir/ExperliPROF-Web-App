import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course-routing.module';
import { AllCourseComponent } from './all-course/all-course.component';
import { DeleteDialogComponent } from './all-course/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-course/dialogs/form-dialog/form-dialog.component';


import { AboutCourseComponent } from './about-course/about-course.component';
import { CourseService } from './all-course/course.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
@NgModule({
  declarations: [
    AllCourseComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AboutCourseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CourseRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [CourseService],
})
export class CourseModule {}
