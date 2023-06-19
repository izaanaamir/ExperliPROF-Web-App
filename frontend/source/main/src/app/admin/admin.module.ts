import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    SettingsComponent],
  imports: [CommonModule,
    ComponentsModule,
    SharedModule,
    AdminRoutingModule],
})
export class AdminModule {}
