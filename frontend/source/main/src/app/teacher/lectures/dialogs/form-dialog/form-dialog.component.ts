import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { LecturesService } from "../../lectures.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Lectures } from "../../lectures.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
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
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lecturesService: LecturesService,
    private fb: UntypedFormBuilder
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
    this.lecturesService.addLectures(this.lecturesForm.getRawValue());
  }

  schools = [
  { label: 'ESIEE', value: 'ESIEE' },
];
  
  courses = [
  { label: 'Intro To Programming', value: 'Intro To Programming' },
  { label: 'Data Structures', value: 'Data Structures' },
  ];

  sections = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  ];
}
