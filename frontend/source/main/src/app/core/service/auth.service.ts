import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
     return this.currentUserSubject.value || { role: '', uuid: '' };
  }

  login(username: string, password: string) {
    return this.http
      .post<any>('http://localhost:8000/api/auth/login/', { username, password })
      .pipe(
        map((response) => {
          if (response.success) {
            const user: User = {
              role: response.role,
              uuid: response.uuid,
              img: response.display_image,
              password: '',
              firstName: response.firstname,
              lastName: response.lastname,
              token: '',
              username: ''
            };
            console.log(this.currentUser)
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          } else {
            throw new Error(response.error || 'Invalid Login');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
    // Perform any additional logout actions as needed
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { User } from '../models/user';
// import { environment } from 'environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;

//   constructor(private http: HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<User>(
//       JSON.parse(localStorage.getItem('currentUser') || '{}')
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
//   }

//   login(username: string, password: string) {
//     return this.http
//       .post<User>(`${environment.apiUrl}/authenticate`, {
//         username,
//         password,
//       })
//       .pipe(
//         map((user) => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes

//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.currentUserSubject.next(user);
//           return user;
//         })
//       );
//   }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(this.currentUserValue);
//     return of({ success: false });
//   }
// }
