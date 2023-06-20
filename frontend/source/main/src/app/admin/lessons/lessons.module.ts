import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonsRoutingModule } from './lessons-routing.module';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { DeleteDialogComponent } from './all-lessons/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-lessons/dialogs/form-dialog/form-dialog.component';


import { AboutLessonsComponent } from './about-lessons/about-lessons.component';
import { lessonsService } from './all-lessons/lessons.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
@NgModule({
  declarations: [
    AllLessonsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AboutLessonsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LessonsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [lessonsService],
})
export class LessonsModule {}
