import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { lessonsService } from '../../lessons.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Lessons } from '../../lessons.model';
import { formatDate } from '@angular/common';

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
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lessonsService: lessonsService,
    private fb: UntypedFormBuilder
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
      courseName: [this.lessons.courseName],
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
  courseNames = [
    { label: 'Intro To Programming', value: 'Intro To Programming' },
    { label: 'Data Structures', value: 'Data Structures' },
    ];

}
