import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
export class Teachers {
  TeacherID: number;
  // img: File;
  // cvData: File;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  date: string;
  school: string;
  aboutMe: string;
  address: string;
  title: string;
  user_uuid: string;

  constructor(teachers: Teachers) {
    this.TeacherID = teachers.TeacherID || this.getRandomID();
    // this.img = teachers.img || 'assets/images/user/user1.jpg';
    this.FirstName = teachers.FirstName || '';
    this.LastName = teachers.LastName || '';
    this.Email = teachers.Email || '';
    this.Phone = teachers.Phone || '';
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.school = teachers.school || '';
    // this.cvData = teachers.cvData || '';
    this.aboutMe = teachers.aboutMe || '';
    this.address = teachers.address || '';
    this.title = teachers.title || '';
    this.user_uuid = uuidv4();
    // this.email = this.FirstName + '.' + this.LastName + '@experligence.com';
    // this.password =
  }
  public getRandomID(): number {
  const S4 = () => {
    return ((1 + Math.random()) * 0x10000) | 0;
  };
  return S4() + S4();
  }
}

