import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { GradesService } from '../../grades.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Grades } from '../../grades.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export interface DialogData {
  id: number;
  action: string;
  grades: Grades;
}

@Component({
  selector: 'app-form-dialog:not(a)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  gradesForm: UntypedFormGroup;
  grades: Grades;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public gradesService: GradesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.grades.dName;
      this.grades = data.grades;
    } else {
      this.dialogTitle = 'New Grades';
      const blankObject = {} as Grades;
      this.grades = new Grades(blankObject);
    }
    this.gradesForm = this.createContactForm();
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
      id: [this.grades.id],
      sName: [this.extractedStudentList],
      courseName: [this.courses],
      sectionID: [this.sections],
      Module: [
      ],
      sYear: [this.grades.sYear],
      GradeTotal: [this.grades.sCapacity],
    });
  }
    storedStudentListString = localStorage.getItem('studentList') as string;
  courses = [
  { label: 'Basics of Engineering', value: 'Basics of Engineering' },
  { label: 'Basics of Calculus', value: 'Basics of Calculus' },
];
  sections = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];
  // Parse the stored string back into an array or use the default array if no value is stored
  storedStudentList = this.storedStudentListString ? JSON.parse(this.storedStudentListString) : [];

  // Extract the label and value properties from the storedStudentList
  extractedStudentList = this.storedStudentList.map((student: any) => {
    return {
      label: student.studentName,
      value: student.studentName
    };
  });
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.gradesForm.getRawValue())
    this.gradesService.addGrades(this.gradesForm.getRawValue());
  }
}
