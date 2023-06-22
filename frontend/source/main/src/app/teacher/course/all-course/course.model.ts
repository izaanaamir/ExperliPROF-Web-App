import { formatDate } from '@angular/common';
export class Course {
  CourseID: number;
  courseName: string;
  schoolName: string;
  courseDetails: string;


  constructor(course: Course) {
    this.CourseID = course.CourseID;
    this.courseName = course.courseName || '';
    this.schoolName = course.schoolName || '';
    this.courseDetails = course.courseDetails || '';
  }
}

