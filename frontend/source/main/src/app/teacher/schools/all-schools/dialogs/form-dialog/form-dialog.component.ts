import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SchoolsService } from '../../schools.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Schools } from '../../schools.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, throwError } from 'rxjs';



export interface DialogData {
  id: number;
  action: string;
  school: Schools;
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
  schoolsForm: UntypedFormGroup;
  schools: any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public schoolsService: SchoolsService,
    private fb: UntypedFormBuilder,
    private httpClient: HttpClient

  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.school.schoolName;
      this.schools = data.school;
    } else {
      this.dialogTitle = 'New School';
      const blankObject = {} as Schools;
      this.schools = new Schools(blankObject);
    }
    this.schoolsForm = this.createContactForm();
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
    school: [this.getFormattedSchools()],
    date: [this.schools.additionDate]
  });
}

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
      if (this.action === 'edit') {
    this.schoolsService.updateSchools(this.schoolsForm.getRawValue());
      } else {
        this.schoolsService.addSchools(this.schoolsForm.getRawValue());
      }
      this.dialogRef.close(1);
  }

     getSchools(): Observable<Schools[]> {
  const url = 'http://localhost:8000/api/admn/get_all_schools/';
  return this.httpClient.get<Schools[]>(url);
  }

getFormattedSchools() {
  this.getSchools().subscribe(
    (schools: Schools[]) => {
      this.schools = schools.map((school: Schools) => ({
        label: school.schoolName,
        value: school.id
      }));
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    }
  );
}
}
