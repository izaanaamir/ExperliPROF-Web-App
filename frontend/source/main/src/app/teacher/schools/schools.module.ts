import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolsRoutingModule } from './schools-routing.module';
import { AllSchoolsComponent } from './all-schools/all-schools.component';
import { DeleteDialogComponent } from './all-schools/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-schools/dialogs/form-dialog/form-dialog.component';
import { SchoolsService } from './all-schools/schools.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    AllSchoolsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SchoolsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [SchoolsService],
})
export class SchoolsModule {}
