import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  breadscrums = [
    {
      title: '',
      items: [],
      active: 'Settings',
    },
  ];

  email!: string;
  currentPassword!: string;
  newPassword!: string;
  firstName!: string;
  lastName!: string;
  aboutMe!: string;
  address!: string;
  title!: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    var url = "http://localhost:8000/api/user/get_user_info/" + localStorage.getItem("user_uuid")

    this.http.get<any>(url).subscribe(
      (response) => {
        var data = response['data'];
        console.log(data);
        this.email = data['email'];
        this.firstName = data['firstName'];
        this.lastName = data['lastName'];
        // this.aboutMe = data['aboutMe'];
        // this.address = data['address'];
        // this.title = data['title'];

      },
      (error) => {
        // Handle error here
      }
    );
  }

  saveSecuritySettings() {
    // Perform API request to save security settings
    const payload = {
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };
    var url = "http://localhost:8000/api/user/get_user_info/" + localStorage.getItem("user_uuid")
    this.http.post(url, payload).subscribe(
      (response) => {
        // Handle success response
      this.currentPassword = '';
      this.newPassword = '';
      },
      (error) => {
        // Handle error response
      }
    );
  }

    saveAccountChanges(){
    // Perform API request to save security settings
    const payload = {
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,

    };
    var url = "http://localhost:8000/api/user/get_user_info/" + localStorage.getItem("user_uuid")
    this.http.post(url, payload).subscribe(
      (response) => {
        // Handle success response
      this.currentPassword = '';
      this.newPassword = '';
      },
      (error) => {
        // Handle error response
      }
    );
  }
}
