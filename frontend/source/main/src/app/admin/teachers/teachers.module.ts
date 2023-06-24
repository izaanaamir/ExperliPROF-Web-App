import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersRoutingModule } from './teachers-routing.module';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { DeleteDialogComponent } from './all-teachers/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-teachers/dialogs/form-dialog/form-dialog.component';


import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { TeachersService } from './all-teachers/teachers.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CredentialsComponent } from './all-teachers/dialogs/credentials/credentials.component';
@NgModule({
  declarations: [
    AllTeachersComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AboutTeacherComponent,
    CredentialsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    ComponentsModule,
    SharedModule,

  ],
  providers: [TeachersService],
})
export class TeachersModule {}
