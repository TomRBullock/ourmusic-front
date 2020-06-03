import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SpotifyService} from '../services/spotify.service';
import {RegisterService} from '../services/register.service';
import {AuthenticationService} from '../services/authentication.service';
import {UserLoginService} from '../services/user-login.service';

@Component({
  selector: 'app-register',
  providers: [ SpotifyService ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  spotifyConnected = false

  constructor(formBuilder: FormBuilder, private router: Router, private registerService: RegisterService,
              private authenticationService: AuthenticationService, private userLoginService: UserLoginService) {
    this.form = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  onSubmit(regData) {
    console.log(regData);

    this.registerService.registerUser(regData.username, regData.password)
      .subscribe(
        data => {
          this.authenticationService.obtainAccessToken(regData)
            .subscribe(
              data => {
                this.authenticationService.saveToken(data)
                this.userLoginService.getUser()
                this.router.navigate(['']);
              },
              err => alert('Invalid Credentials'));
        }
      )

  }
}
