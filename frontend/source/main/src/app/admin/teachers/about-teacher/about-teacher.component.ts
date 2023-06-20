import { Component } from '@angular/core';

@Component({
  selector: 'app-about-teacher',
  templateUrl: './about-teacher.component.html',
  styleUrls: ['./about-teacher.component.scss'],
})
export class AboutTeacherComponent {
  breadscrums = [
    {
      title: "",
      items: ['Teachers'],
      active: 'Profile',
    },
  ];

  profile = {
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    joiningDate: '',
    address: '',
    cvPath: '',
    title: '',
    aboutMe: '',
    userImg: ''
  };
  rowData = {};

  constructor() {
    // Fetch the profile data from the backend and assign it to the 'profile' object

    this.fetchProfileData();
  }

  fetchProfileData() {
    // Simulating an API call to fetch the profile data from the backend
    // Replace this with your actual API call
    const rowDataString = localStorage.getItem('rowData');
    console.log("rowData:", rowDataString);
      
    if (rowDataString) {
        const rowData = JSON.parse(rowDataString);
      this.profile = {
        name: rowData['FirstName'] +" " + rowData['LastName'],
        title: rowData['title'],
        email: rowData['Email'],
        phone: rowData['Phone'],
        schoolName: 'ESIEE',
        joiningDate: rowData['date'],
        address: rowData['address'],
        cvPath: '/path/to/your-cv.pdf',
        aboutMe: rowData['aboutMe'],
        userImg: 'data:image/png;base64,' + rowData['img']
      };
    }


  }
}
