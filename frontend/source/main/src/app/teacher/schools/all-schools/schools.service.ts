import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schools } from './schools.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable()
export class SchoolsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/schools.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Schools[]> = new BehaviorSubject<Schools[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Schools;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Schools[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSchools(): void {
    const url = "http://localhost:8000/api/teacher/get_all_schools/" + localStorage.getItem("user_uuid")
    this.subs.sink = this.httpClient.get<Schools[]>(url).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addSchools(schools: Schools): void {
    this.dialogData = schools;
    var data: any = {};
    data = this.dialogData;
    data["user_uuid"] = localStorage.getItem("user_uuid");
    console.log(data)
    this.httpClient.post('http://localhost:8000/api/teacher/add_teacher_school/', data)
      .subscribe(
        response => {
          // Handle the response from the backend
          console.log('Form data sent successfully');
        },
        error => {
          // Handle any errors that occurred during the API call
          console.error('Error occurred while sending form data:', error);
        }
      );
  }
  updateSchools(schools: Schools): void {
    this.dialogData = schools;
    this.httpClient.put("http://localhost:8000/api/teacher/update_school/" + schools.id, schools)
        .subscribe({
          next: (data) => {
            this.dialogData = schools;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteSchools(id: number): void {
    this.httpClient.delete("http://localhost:8000/api/teacher/remove_school/" + id)
        .subscribe({
          next: (data) => {
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
}
