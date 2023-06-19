import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CourseService } from '../../course.service';

export interface DialogData {
  CourseID: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
}

@Component({
  selector: 'app-delete:not(h)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public courseService: CourseService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  // confirmDelete(): void {
  //   this.courseService.deleteCourse(this.data.CourseID);
  // }
}
