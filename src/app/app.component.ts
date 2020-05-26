import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {slideInAnimation} from './animations';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  providers: [ AuthenticationService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'OurMusic';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    let isLoggedIn = this.authenticationService.checkLoginState();
    console.log("isLoggedIn ", isLoggedIn)
    if (isLoggedIn) {
      let resource = this.authenticationService.getResource('/token');
      console.log("resource ", resource)
    }

  }

  logout() {
    this.authenticationService.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
