import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { GradesService } from '../../grades.service';

export interface DialogData {
  id: number;
  dName: string;
  hod: string;
  phone: string;
}

@Component({
  selector: 'app-delete:not(a)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public gradesService: GradesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.gradesService.deleteGrades(this.data.id);
  }
}
