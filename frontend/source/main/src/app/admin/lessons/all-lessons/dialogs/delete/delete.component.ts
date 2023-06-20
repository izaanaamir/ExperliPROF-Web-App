import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { lessonsService } from '../../lessons.service';

export interface DialogData {
  LessonsID: number;
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
    public lessonsService: lessonsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  // confirmDelete(): void {
  //   this.courseService.deleteCourse(this.data.CourseID);
  // }
}
