import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/teachers.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Teachers;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
 getAllTeachers(): Observable<any> {
  return this.httpClient.get<any>("http://localhost:8000/api/teacher/get_teachers/")
    .pipe(
      tap((data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
        console.log(data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
        return throwError(error);
      })
    );
}

  addTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    // this.httpClient.post(this.API_URL, teachers)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = teachers;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    // this.httpClient.put(this.API_URL + teachers.id, teachers)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = teachers;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteTeachers(id: number): void {
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
