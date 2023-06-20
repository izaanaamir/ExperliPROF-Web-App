import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  breadscrums = [
    {
      title: '',
      items: [],
      active: 'Settings',
    },
  ];

  securityForm: FormGroup;
  passwordMismatch: boolean;
  saveSuccess: boolean;

  get currentPassword() {
    return this.securityForm.get('currentPassword') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {
    this.securityForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });

    this.passwordMismatch = false;
    this.saveSuccess = false;
  }

  savePassword() {
    if (this.securityForm.invalid) {
      // Mark form controls as touched to trigger validation messages
      this.securityForm.markAllAsTouched();
      return;
    }

    const currentPassword = this.securityForm.get('currentPassword')?.value;
    const newPassword = this.securityForm.get('newPassword')?.value;

    // Validate current password
    if (currentPassword !== 'correctpassword') {
      this.passwordMismatch = true;
      return;
    }

    // Save the new password
    // Your saving logic goes here

    // Clear form and display success message
    this.securityForm.reset();
    this.saveSuccess = true;
  }
}
