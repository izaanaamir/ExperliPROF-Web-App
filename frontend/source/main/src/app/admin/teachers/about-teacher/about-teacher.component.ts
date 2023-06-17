import { Component } from '@angular/core';

@Component({
  selector: 'app-about-teacher',
  templateUrl: './about-teacher.component.html',
  styleUrls: ['./about-teacher.component.scss'],
})
export class AboutTeacherComponent {
  breadscrums = [
    {
      title:"",
      items: [],
      active: 'Profile',
    },
  ];
  constructor() {
    // constructor
  }
}
