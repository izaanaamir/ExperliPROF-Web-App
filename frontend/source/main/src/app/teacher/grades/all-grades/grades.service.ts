import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grades } from './grades.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class GradesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/grades.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Grades[]> = new BehaviorSubject<Grades[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Grades;
  studentGradeList: any[]= [];
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Grades[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllGrades(): void {
    this.isTblLoading = false;
    const storedArrayString = localStorage.getItem('studentGradeList');
    const storedArray = JSON.parse(storedArrayString || '[]');
    console.log(storedArray)
    this.dataChange.next(storedArray);

    // this.subs.sink = this.httpClient.get<Grades[]>(this.API_URL).subscribe({
    //   next: (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(data);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + ' ' + error.message);
    //   },
    // });
  }
  addGrades(grades: Grades): void {
    this.dialogData = grades;
    this.studentGradeList.push(grades)
    localStorage.setItem('studentGradeList', JSON.stringify(this.studentGradeList));
    console.log(localStorage.getItem('studentGradeList'))

    // this.httpClient.post(this.API_URL, schools)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = schools;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateGrades(grades: Grades): void {
    this.dialogData = grades;

    // this.httpClient.put(this.API_URL + schools.id, schools)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = schools;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteGrades(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
