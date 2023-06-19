import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  breadscrums = [
    {
      title: 'Settings',
      items: ['Admin'],
      active: 'Settings',
    },
  ];

  constructor() {
    // constructor
  }
}
