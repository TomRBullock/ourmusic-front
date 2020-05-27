import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {slideInAnimation} from './animations';
import {AuthenticationService} from './services/authentication.service';
import {User} from './model/user.model';
import {UserLoginService} from './services/user-login.service';

@Component({
  selector: 'app-root',
  providers: [ AuthenticationService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'OurMusic';
  username: String = null;

  constructor(private authenticationService: AuthenticationService, private userLoginService: UserLoginService) {}

  ngOnInit(): void {
    this.userLoginService.subject.subscribe({
      next: username => {
        this.username = username
      }
    })
    this.userLoginService.getUser()
  }

  isLoggedIn(): boolean {
    if(this.username != null) {
      return true
    }
    return false
  }

  logout() {
    this.authenticationService.logout();
    if (!this.authenticationService.checkLoginState()) {
      this.username = null
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
