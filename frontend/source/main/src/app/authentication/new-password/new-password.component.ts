import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const newPassword = this.newPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.newPasswordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
      // Add your logic here for password submission and redirection
    }
  }
}
