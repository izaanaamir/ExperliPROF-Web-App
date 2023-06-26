export class Grades {
  id: number;
  dName: string;
  hod: string;
  phone: string;
  email: string;
  sYear: string;
  sCapacity: string;
  constructor(grades: Grades) {
    {
      this.id = grades.id || this.getRandomID();
      this.dName = grades.dName || '';
      this.hod = grades.hod || '';
      this.phone = grades.phone || '';
      this.email = grades.email || '';
      this.sYear = grades.sYear || '';
      this.sCapacity = grades.sCapacity || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}