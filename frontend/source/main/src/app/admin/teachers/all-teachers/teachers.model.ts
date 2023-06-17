import { formatDate } from '@angular/common';
export class Teachers {
  TeacherID: number;
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


  constructor(teachers: Teachers) {
    this.TeacherID = teachers.TeacherID;
    this.img = teachers.img || 'assets/images/user/user1.jpg';
    this.FirstName = teachers.FirstName || '';
    this.LastName = teachers.LastName || '';
    this.Email = teachers.Email || '';
    this.Phone = teachers.Phone || '';
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.school = teachers.school || '';
    this.cvData = teachers.cvData || '';
    this.aboutMe = teachers.aboutMe || '';
    this.address = teachers.address || '';
    this.title = teachers.title || '';
  }
}

