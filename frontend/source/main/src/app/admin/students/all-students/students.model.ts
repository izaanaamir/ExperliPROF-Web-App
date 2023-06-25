import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

export class Students {
  id: number;
  lastName: string;
  firstName: string;
  schoolemail: string;
  personalemail: string;
  Title: string;
  registrationnumber: string
  groupmajor: string
  GSM: string;
  statusofstudent: string;
  specialrequirements: string;
  school: string;
  img: string;
  user_uuid: string;


  constructor(students: Students) {
    {
      this.id = students.id || this.getRandomID();
      this.lastName = students.lastName || '';
      this.firstName = students.firstName || '';
      this.schoolemail = students.schoolemail || '';
      this.personalemail = students.personalemail || '';
      this.Title = students.Title || '';
      this.registrationnumber = students.registrationnumber || '';
      this.groupmajor = students.groupmajor || '';
      this.GSM = students.GSM || '';
      this.statusofstudent = students.statusofstudent || '';
      this.specialrequirements = students.specialrequirements || '';
      this.school = students.school || '';
      this.img = students.img || "";
      this.user_uuid = uuidv4();
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
