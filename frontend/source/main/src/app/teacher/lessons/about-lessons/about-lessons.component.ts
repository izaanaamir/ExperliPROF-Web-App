import { Component } from '@angular/core';

@Component({
  selector: 'app-about-lessons',
  templateUrl: './about-lessons.component.html',
  styleUrls: ['./about-lessons.component.scss'],
})
export class AboutLessonsComponent {
  breadscrums = [
    {
      title:"",
      items: [],
      active: 'Sections',
    },
  ];
  constructor() {
    // constructor
  }
}
