import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  subject = new BehaviorSubject<String>(null)

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    let isLoggedIn = this.authenticationService.checkLoginState();
    if (!isLoggedIn) {
      this.router.navigate(['/login'])
    }
    return isLoggedIn
  }

  getUser() {
    let isLoggedIn = this.authenticationService.checkLoginState();
    if (isLoggedIn) {
      let resource = this.authenticationService.getResource('/api/user')
        .subscribe(
          (data) => {
            this.subject.next(data.username)
          },
          (error) => {
            console.log(AuthenticationService.handleError(error))
          }
        );
    }
  }

}
