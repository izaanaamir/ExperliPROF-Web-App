import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Teachers } from '../../teachers.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  teachers: Teachers;
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
  teachers: Teachers;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teachersService: TeachersService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.FirstName;
      this.teachers = data.teachers;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Teachers;
      this.teachers = new Teachers(blankObject);
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
      id: [this.teachers.TeacherID],
      FirstName: [this.teachers.FirstName],
      LastName: [this.teachers.LastName],
      Email: [
        this.teachers.Email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      date: [
        formatDate(this.teachers.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      Phone: [this.teachers.Phone],
      school: [this.teachers.school],
      aboutMe: [this.teachers.aboutMe],
      address: [this.teachers.address],
      title: [this.teachers.title],
      cvData: [this.teachers.cvData],
      img: [this.teachers.img],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const cvFileInput = document.getElementById('cvFileInput') as HTMLInputElement;
    const imgFileInput = document.getElementById('imgFileInput') as HTMLInputElement;
    console.log(cvFileInput.files)
    console.log(imgFileInput.files)

    // Check if files were selected
    if (cvFileInput.files) {
      const cvFile = cvFileInput.files[0];
      const cvReader = new FileReader();
      cvReader.onload = () => {
        const base64String = cvReader.result?.toString().split(',')[1];
        this.teachers.cvData = base64String || '';
      };
      cvReader.readAsDataURL(cvFile);
    }
    if (imgFileInput.files) {
      const imgFile = imgFileInput.files[0];
      const imgReader = new FileReader();
      imgReader.onload = () => {
        const base64String = imgReader.result?.toString().split(',')[1];
        this.teachers.img = base64String || '';
      };
      imgReader.readAsDataURL(imgFile);
    }
    this.teachers = this.proForm.getRawValue()
    console.log("Before sending request", this.teachers)
    this.teachersService.addTeachers(this.teachers);

  }

  // Inside your component class


  // Inside your component class
  schools = [
    { label: 'Esiee', value: 'Esiee' },
    { label: 'Bilkent', value: 'Bilkent' },
    { label: 'Chandigarh University', value: 'Chandigarh University' },
    { label: 'Limerick', value: 'Limerick' },
    { label: 'Kyoto', value: 'Kyoto' }
    ];

}
