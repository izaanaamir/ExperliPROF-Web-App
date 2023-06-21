import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradesRoutingModule } from './grades-routing.module';
import { AllGradesComponent } from './all-grades/all-grades.component';
import { DeleteDialogComponent } from './all-grades/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-grades/dialogs/form-dialog/form-dialog.component';
import { GradesService } from './all-grades/grades.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    AllGradesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GradesRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [GradesService],
})
export class GradesModule {}
