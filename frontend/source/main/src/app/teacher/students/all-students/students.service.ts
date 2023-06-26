import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  studentList: any[] = []
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Students[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStudentss(): void {
    this.isTblLoading = false;
    const storedArrayString = localStorage.getItem('studentList');
    const storedArray = JSON.parse(storedArrayString || '[]');
    console.log(storedArray)
    this.dataChange.next(storedArray);
    // console.log(localStorage.removeItem('studentList'))
    // localStorage.removeItem('studentList')

    // this.subs.sink = this.httpClient.get<Students[]>("").subscribe({
    //   next: (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(this.studentList);
    //     console.log(data)
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + ' ' + error.message);
    //   },
    // });
  }
  addStudents(students: Students): void {
    this.dialogData = students;
    this.studentList.push(students)
    localStorage.setItem('studentList', JSON.stringify(this.studentList));

    // this.httpClient.post("http://localhost:8000/api/teacher/add_student/", students)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = students;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateStudents(students: Students): void {
    this.dialogData = students;

    // this.httpClient.put(this.API_URL + students.id, students)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = students;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteStudents(id: number): void {
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
