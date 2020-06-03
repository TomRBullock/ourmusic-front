import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {UserLoginService} from '../services/user-login.service';

@Component({
  selector: 'app-login',
  providers: [ AuthenticationService ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Output() userLogin = new EventEmitter();

  constructor(formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService,
              private userLoginService: UserLoginService) {
    this.form = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  loginEvent(userCredentials) {
    this.authenticationService.obtainAccessToken(userCredentials)
      .subscribe(
        data => {
          this.authenticationService.saveToken(data)
          this.userLoginService.getUser()
          this.router.navigate(['']);
        },
        err => alert('Invalid Credentials'));
  }

  registerEvent() {
    this.router.navigate(['register']);
  }

}
