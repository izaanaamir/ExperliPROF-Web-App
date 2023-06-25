import { formatDate } from '@angular/common';
export class Course {
  id: number
  CourseID: string;
  courseName: string;
  schoolName: string;
  courseDetails: string;


  constructor(course: Course) {
    this.id = course.id;
    this.CourseID = course.CourseID;
    this.courseName = course.courseName || '';
    this.schoolName = course.schoolName || '';
    this.courseDetails = course.courseDetails || '';
  }
}

