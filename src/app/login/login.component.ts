import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  loginEvent(userCredentials) {
    console.log(userCredentials);
    //todo: login request
    this.router.navigate(['']);
  }

  registerEvent() {
    this.router.navigate(['register']);
  }

}
