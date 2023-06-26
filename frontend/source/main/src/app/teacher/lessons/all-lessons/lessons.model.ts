import { formatDate } from '@angular/common';
export class Lessons {
  id!: number;
  sectionID!: number;
  courseName!: string;
  numOfStudents!: number;



  constructor(lessons: Lessons) {
    this.sectionID = lessons.sectionID;
    this.courseName = lessons.courseName;
    this.numOfStudents = lessons.numOfStudents;
    this.id = lessons.id;
  }
}

