export class Schools {
  id: number;
  dName: string;
  hod: string;
  phone: string;
  email: string;
  sYear: string;
  sCapacity: string;
  constructor(schools: Schools) {
    {
      this.id = schools.id || this.getRandomID();
      this.dName = schools.dName || '';
      this.hod = schools.hod || '';
      this.phone = schools.phone || '';
      this.email = schools.email || '';
      this.sYear = schools.sYear || '';
      this.sCapacity = schools.sCapacity || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
