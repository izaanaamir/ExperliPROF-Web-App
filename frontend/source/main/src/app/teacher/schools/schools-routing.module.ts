import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSchoolsComponent } from './all-schools/all-schools.component';

const routes: Routes = [
  {
    path: 'all-schools',
    component: AllSchoolsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule {}
