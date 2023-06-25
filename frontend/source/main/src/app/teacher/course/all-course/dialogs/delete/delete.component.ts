import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CourseService } from '../../course.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  id: number
  courseID: string;
  courseName: string;
  schoolName: string;
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
    public courseService: CourseService,
    private httpClient: HttpClient
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  confirmDelete(): void {
     this.httpClient.delete("http://localhost:8000/api/teacher/delete_course/"+ this.data.id)
      .subscribe(
        () => {
          console.log('Course deleted successfully.');
          // Perform any necessary actions after successful deletion
        },
        (error: HttpErrorResponse) => {
          console.error(error.name + ' ' + error.message);
          // Handle the error appropriately
        }
      );
  }
}
