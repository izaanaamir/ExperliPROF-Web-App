import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lessons } from './lessons.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class lessonsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/lessons.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Lessons[]> = new BehaviorSubject<Lessons[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Lessons;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Lessons[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLessons(): void {
    this.subs.sink = this.httpClient.get<Lessons[]>("http://localhost:8000/api/lessons/get_lessons/").subscribe({
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
  addLessons(lessons: Lessons): void {
    this.dialogData = lessons;
    console.log(this.dialogData)
    this.httpClient.post("http://localhost:8000/api/lessons/add_lessons/", lessons)
      .subscribe({
        next: (data) => {
          this.dialogData = lessons;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateLessons(lessons: Lessons): void {
    this.dialogData = lessons;

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
