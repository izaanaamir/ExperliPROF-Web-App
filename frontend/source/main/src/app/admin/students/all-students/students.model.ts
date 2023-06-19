import { formatDate } from '@angular/common';
export class Students {
  id: number;
  lastname: string;
  firstname: string;
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


  constructor(students: Students) {
    {
      this.id = students.id || this.getRandomID();
      this.lastname = students.lastname || '';
      this.firstname = students.firstname || '';
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
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
