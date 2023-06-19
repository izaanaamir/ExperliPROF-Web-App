import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from './course.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class CourseService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/course.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Course;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Course[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCourse(): void {
    this.subs.sink = this.httpClient.get<Course[]>("http://localhost:8000/api/course/get_course/").subscribe({
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
  addCourse(course: Course): void {
    this.dialogData = course;
    console.log(this.dialogData)
    this.httpClient.post("http://localhost:8000/api/course/add_course/", course)
      .subscribe({
        next: (data) => {
          this.dialogData = course;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateCourse(course: Course): void {
    this.dialogData = course;

    // this.httpClient.put(this.API_URL + course.id, course)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = course;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  // deleteCourse(course: number): void {
  //   this.httpClient.delete("http://localhost:8000/api/course/remove_course/" + courseID)
  //     .subscribe(
  //       () => {
  //         console.log('Course deleted successfully.');
  //         // Perform any necessary actions after successful deletion
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(error.name + ' ' + error.message);
  //         // Handle the error appropriately
  //       }
  //     );
  // }
}