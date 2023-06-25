import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { lessonsService } from '../../lessons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService, Role } from '@core';


import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Lessons } from '../../lessons.model';
import { formatDate } from '@angular/common';
import { Course } from 'app/teacher/course/all-course/course.model';
import { Observable } from 'rxjs';

export interface DialogData {
  id: number;
  action: string;
  lessons: Lessons;
}

@Component({
  selector: 'app-form-dialog:not(h)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  lessons: Lessons;
  courses: any
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lessonsService: lessonsService,
    private fb: UntypedFormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,

  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = ""+ data.lessons.sectionID;
      this.lessons = data.lessons;
    } else {
      this.dialogTitle = 'New Lessons';
      const blankObject = {} as Lessons;
      this.lessons = new Lessons(blankObject);
    }
    this.proForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      sectionID: [this.lessons.sectionID],
      courses: [this.getFormattedCourses()],
      numOfStudents: [this.lessons.numOfStudents]

    });
  }
  submit() {
    this.confirmAdd();
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.lessonsService.addLessons(this.proForm.getRawValue());
  }
  // Inside your component class

  getCourses(): Observable<Course[]> {
  const url = 'http://localhost:8000/api/teacher/get_all_teacher_courses/'+localStorage.getItem("user_uuid");
  return this.httpClient.get<Course[]>(url);
  }

getFormattedCourses() {
  this.getCourses().subscribe(
    (schools: Course[]) => {
      this.courses = schools.map((course: Course) => ({
        label: course.courseName,
        value: course.id
      }));
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
  );
}
}
