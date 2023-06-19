import { formatDate } from '@angular/common';
export class Course {
  CourseID: number;
  img: string;
  cvData: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  date: string;
  school: string;
  aboutMe: string;
  address: string;
  title: string;


  constructor(course: Course) {
    this.CourseID = course.CourseID;
    this.img = course.img || 'assets/images/user/user1.jpg';
    this.FirstName = course.FirstName || '';
    this.LastName = course.LastName || '';
    this.Email = course.Email || '';
    this.Phone = course.Phone || '';
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.school = course.school || '';
    this.cvData = course.cvData || '';
    this.aboutMe = course.aboutMe || '';
    this.address = course.address || '';
    this.title = course.title || '';
  }
}

