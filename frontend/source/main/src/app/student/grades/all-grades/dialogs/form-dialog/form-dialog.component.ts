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
  // dialogTitle: string;
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
      // this.dialogTitle = data.grades.dName;
      this.grades = data.grades;
    } else {
      // this.dialogTitle = 'New Grades';
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
    return this.fb.group({})
    //   id: [this.grades.id],
    //   dName: [this.grades.dName, [Validators.required]],
    //   hod: [this.grades.hod, [Validators.required]],
    //   phone: [this.grades.phone, [Validators.required]],
    //   email: [
    //     this.grades.email,
    //     [Validators.required, Validators.email, Validators.minLength(5)],
    //   ],
    //   sYear: [this.grades.sYear, [Validators.required]],
    //   sCapacity: [this.grades.sCapacity, [Validators.required]],
    // });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.gradesService.addGrades(this.gradesForm.getRawValue());
  }
  school = [
    { label: 'Esiee', value: 'Esiee' },
    { label: 'Bilkent', value: 'Bilkent' },
    { label: 'Chandigarh University', value: 'Chandigarh University' },
    { label: 'Limerick', value: 'Limerick' },
    { label: 'Kyoto', value: 'Kyoto' }
  ];
}
