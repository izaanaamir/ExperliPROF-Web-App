import { formatDate } from '@angular/common';
export class Teachers {
  TeacherID: number;
  img: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  date: string;
  gender: string;
  mobile: string;
  school: string;
  degree: string;

  constructor(teachers: Teachers) {
    this.TeacherID = teachers.TeacherID;
    this.img = teachers.img || 'assets/images/user/user1.jpg';
    this.FirstName = teachers.FirstName || '';
    this.LastName = teachers.LastName || '';
    this.Email = teachers.Email || '';
    this.Phone = teachers.Phone || '';
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.gender = teachers.gender || '';
    this.mobile = teachers.mobile || '';
    this.school = teachers.school || '';
    this.degree = teachers.degree || '';
  }
}

