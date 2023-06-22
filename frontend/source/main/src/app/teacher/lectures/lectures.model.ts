export class Lectures {
  id: number;
  schoolName: string;
  courseName: string;
  sectionID: string;
  date: string;
  time: string;
  constructor(lectures: Lectures) {
    {
      this.id = lectures.id || this.getRandomID();
      this.schoolName = lectures.schoolName || '';
      this.courseName = lectures.courseName || '';
      this.date = lectures.date || '';
      this.time = lectures.time || '';
      this.sectionID = lectures.sectionID || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
