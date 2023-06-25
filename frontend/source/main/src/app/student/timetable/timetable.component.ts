import { Component } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent {
  breadscrums = [
    {
      title: '',
      items: [],
      active: 'Timetable',
    },
  ];

  constructor() {
    //constructor
  }
}
