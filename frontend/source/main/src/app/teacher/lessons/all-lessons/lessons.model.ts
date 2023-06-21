import { formatDate } from '@angular/common';
export class Lessons {
  LessonsID: number;
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


  constructor(lessons: Lessons) {
    this.LessonsID = lessons.LessonsID;
    this.img = lessons.img || 'assets/images/user/user1.jpg';
    this.FirstName = lessons.FirstName || '';
    this.LastName = lessons.LastName || '';
    this.Email = lessons.Email || '';
    this.Phone = lessons.Phone || '';
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.school = lessons.school || '';
    this.cvData = lessons.cvData || '';
    this.aboutMe = lessons.aboutMe || '';
    this.address = lessons.address || '';
    this.title = lessons.title || '';
  }
}

