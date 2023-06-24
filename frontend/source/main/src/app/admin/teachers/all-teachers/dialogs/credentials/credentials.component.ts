import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  email!: string;
  password!: string;
  passwordVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CredentialsComponent>,
    private clipboard: Clipboard,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {}

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
