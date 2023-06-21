import { Component } from '@angular/core';

@Component({
  selector: 'app-about-course',
  templateUrl: './about-course.component.html',
  styleUrls: ['./about-course.component.scss'],
})
export class AboutCourseComponent {
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
