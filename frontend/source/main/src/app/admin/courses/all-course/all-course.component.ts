import { Component } from '@angular/core';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent {
  breadscrums = [
    {
      items: ['Course'],
      active: 'All Course',
    },
  ];
  constructor() {
    // constructor
  }
}
