import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  subject = new BehaviorSubject<String>(null)

  constructor(private authenticationService: AuthenticationService) { }

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
