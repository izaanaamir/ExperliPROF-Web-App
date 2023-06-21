import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGradesComponent } from './all-grades/all-grades.component';

const routes: Routes = [
  {
    path: 'all-Grades',
    component: AllGradesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule {}
