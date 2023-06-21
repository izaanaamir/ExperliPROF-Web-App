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
import { HttpClient } from '@angular/common/http';

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
    private fb: UntypedFormBuilder,
    private http: HttpClient
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
    const formData = new FormData();
    // Create a new FormData object to store the form data
    this.teachers = this.proForm.getRawValue()
    // Check if CV file was selected
    if (cvFileInput.files) {
      const cvFile = cvFileInput.files[0];
      console.log("cv:", cvFile);
      this.teachers.cvData = cvFile;
      formData.append('cvInfo', cvFile);

    }

    // Check if image file was selected
    if (imgFileInput.files) {
      const imgFile = imgFileInput.files[0];
      console.log("image:", imgFile)
      this.teachers.img = imgFile;
      formData.append('imgInfo', imgFile);
    }
    formData.append('teachersData', JSON.stringify(this.teachers));
    console.log("Before sending request", this.teachers);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
}
    // this.teachersService.addTeachers(this.teachers);
    this.http.post('http://localhost:8000/api/teacher/add_teacher/', formData).subscribe(
    (response) => {
    console.log('File uploaded successfully', response);
    // Handle the server response here
    // ...
  },
  (error) => {
    console.error('Error uploading file', error);
    // Handle any errors that occurred during the request
    // ...
  }
);

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