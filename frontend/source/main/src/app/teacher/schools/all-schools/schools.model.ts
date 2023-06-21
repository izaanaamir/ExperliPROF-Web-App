export class Schools {
  id: number;
  schoolName: string;
  hod: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;

  constructor(schools: Schools) {
    this.id = schools.id || this.getRandomID();
    this.schoolName = schools.schoolName || '';
    this.hod = schools.hod || '';
    this.phone = schools.phone || '';
    this.email = schools.email || '';
    this.address = schools.address || '';
    this.city = schools.city || '';
    this.state = schools.state || '';
    this.country = schools.country || '';
  }

  private getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
