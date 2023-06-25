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
    const url = "http://localhost:8000/api/teacher/get_courses/" + localStorage.getItem("user_uuid")
    this.subs.sink = this.httpClient.get<Course[]>(url).subscribe({
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
    var data: any = {};
    data = this.dialogData;
    data["user_uuid"] = localStorage.getItem("user_uuid");
    console.log(data)
    this.httpClient.post("http://localhost:8000/api/teacher/add_course/", data)
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
  deleteCourse(course: number): void {
   
  }
}