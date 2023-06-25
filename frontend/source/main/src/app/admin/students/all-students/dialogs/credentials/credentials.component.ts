import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface DialogData {
  email: number;
  password: string;
}

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  email!: string;
  password!: string;
  passwordVisible!: boolean;

  constructor(
    public dialogRef: MatDialogRef<CredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    this.email = this.data.email;
    this.password = this.data.password;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  copyPassword(): void {
    this.clipboard.copy(this.password);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
