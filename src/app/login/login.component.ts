import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  model = {
    username: '',
    password: ''
  };

  constructor(form: FormBuilder, private router: Router) {
    this.form = form.group({
      color: new FormControl('primary')
    });
  }

  ngOnInit() {}

  loginEvent(form: Form) {
    console.log(form);
    //todo: login request
  }

  registerEvent() {
    this.router.navigate(['register']);
  }

}
