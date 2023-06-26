import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LecturesService } from '../../lectures.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface DialogData {
  id: number;
  schoolName: string;
  courseName: string;
  sectionID: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-delete:not(k)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lecturesService: LecturesService,
    private httpClient: HttpClient
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log(this.data.id)
        this.httpClient.delete("http://localhost:8000/api/teacher/delete_lecture/"+ this.data.id)
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
