import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Teachers } from '../../teachers.model';
import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { mergeMap } from 'rxjs';


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
  @ViewChild('cvFileInput', { static: false }) cvFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('imgFileInput', { static: false }) imgFileInput!: ElementRef<HTMLInputElement>;

  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teachers;
  selectedFileName = '';

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
      user_uuid: [this.teachers.user_uuid]
      // cvData: [this.teachers.cvData],
      // img: [this.teachers.img],
    });
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    }
  }

  public confirmAdd(): void {
    // const formData = new FormData();
    this.teachers = this.proForm.getRawValue();
    console.log("teachers info in confirmAdd", this.teachers)
    // Check if CV file was selected
    // if (this.cvFileInput.nativeElement.files && this.cvFileInput.nativeElement.files.length > 0) {
    //   const cvFile = this.cvFileInput.nativeElement.files[0];
    //   console.log("cv:", cvFile);
    //   this.teachers.cvData = cvFile;
    //   formData.append('cvInfo', cvFile);
    // }

    // // Check if image file was selected
    // if (this.imgFileInput.nativeElement.files && this.imgFileInput.nativeElement.files.length > 0) {
    //   const imgFile = this.imgFileInput.nativeElement.files[0];
    //   console.log("image:", imgFile);
    //   this.teachers.img = imgFile;
    //   formData.append('imgInfo', imgFile);
    // }

    // formData.append('teachersData', JSON.stringify(this.teachers));
    // console.log("Before sending request", this.teachers);
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

  var apiData = {
      'user_uuid' : this.teachers.user_uuid,
      'firstName': this.teachers.FirstName,
      'lastName': this.teachers.LastName,
      'Role': 'Teacher',
      'email': this.teachers.Email
    }
    this.http.post("http://localhost:8000/api/user/create_user/", apiData)
  .pipe(
    mergeMap(() => {
      // Second API call to add the teacher
      return this.http.post('http://localhost:8000/api/teacher/add_teacher/', this.teachers);
    })
  )
  .subscribe(
    (response) => {
      console.log('Teacher added successfully', response);
      // Handle the server response here
      // ...
    },
    (error) => {
      console.error('Error adding teacher', error);
      // Handle any errors that occurred during the request
      // ...
    }
  );

  }

  // schools = [
  //   { label: 'Esiee', value: 'Esiee' },
  //   { label: 'Bilkent', value: 'Bilkent' },
  //   { label: 'Chandigarh University', value: 'Chandigarh University' },
  //   { label: 'Limerick', value: 'Limerick' },
  //   { label: 'Kyoto', value: 'Kyoto' }
  // ];
}
