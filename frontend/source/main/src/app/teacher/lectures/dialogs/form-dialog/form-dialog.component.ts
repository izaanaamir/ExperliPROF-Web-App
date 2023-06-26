import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { LecturesService } from "../../lectures.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Lectures } from "../../lectures.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { Observable } from "rxjs";
import { Lessons } from "app/teacher/lessons/all-lessons/lessons.model";
import { Schools } from "app/teacher/schools/all-schools/schools.model";
import { Course } from "app/teacher/course/all-course/course.model";
export interface DialogData {
  id: number;
  action: string;
  lectures: Lectures;
}

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  lecturesForm: UntypedFormGroup;
  lectures: Lectures;
  courses: any;
  schools: any;
  sections: any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lecturesService: LecturesService,
    private fb: UntypedFormBuilder,
    private httpClient: HttpClient
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.lectures.schoolName;
      this.lectures = data.lectures;
    } else {
      this.dialogTitle = "New Lecture";
      const blankObject = {} as Lectures;
      this.lectures = new Lectures(blankObject);
    }
    this.lecturesForm = this.createContactForm();
    this.getFormattedCourses();
    this.getFormattedSections();
    this.getFormattedSchools();
  }
  formControl = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.lectures.id],
      schoolName: [this.lectures.schoolName, [Validators.required]],
      courseName: [this.lectures.courseName, [Validators.required]],
      date: [this.lectures.date, [Validators.required]],
      time: [this.lectures.time, [Validators.required]],
      sectionID: [this.lectures.sectionID, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.lecturesForm.getRawValue())
      this.httpClient.post("http://localhost:8000/api/teacher/add_lecture/" + localStorage.getItem("user_uuid"), this.lecturesForm.getRawValue())
      .subscribe({
        next: (data) => {
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }

//   schools = [
//     { label: 'ESIEE', value: 'ESIEE' },
//     { label: 'Bilkent', value: 'Bilkent'}
// ];
  
//   courses = [
//   { label: 'Intro To Programming', value: 'Intro To Programming' },
//   { label: 'Data Structures', value: 'Data Structures' },
//   ];

//   sections = [
//   { label: '1', value: '1' },
//   { label: '2', value: '2' },
//   ];
  getCourses(): Observable<Course[]> {
  const url = 'http://localhost:8000/api/teacher/get_all_teacher_courses/'+localStorage.getItem("user_uuid");
  return this.httpClient.get<Course[]>(url);
  }

getFormattedCourses() {
  this.getCourses().subscribe(
    (courses: Course[]) => {
      this.courses = courses.map((course: Course) => ({
        label: course.courseName,
        value: course.courseName
      }));
      console.log('Formatted courses:', this.courses);
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
  );
  }
   getSchools(): Observable<Schools[]> {
  const url = 'http://localhost:8000/api/teacher/get_all_schools/'+localStorage.getItem("user_uuid");
  return this.httpClient.get<Schools[]>(url);
  }

getFormattedSchools() {
  this.getSchools().subscribe(
    (schools: Schools[]) => {
      this.schools = schools.map((school: Schools) => ({
        label: school.schoolName,
        value: school.schoolName
      }));
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
  );
}
    getSections(): Observable<Lessons[]> {
  const url = 'http://localhost:8000/api/teacher/get_all_sections/'+localStorage.getItem("user_uuid");
  return this.httpClient.get<Lessons[]>(url);
  }

getFormattedSections() {
  this.getSections().subscribe(
    (sections: Lessons[]) => {
      this.sections = sections.map((lesson: Lessons) => ({
        label: lesson.sectionID,
        value: lesson.sectionID
      }));
      console.log('Formatted courses:', this.courses);
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
  );
  }
}
