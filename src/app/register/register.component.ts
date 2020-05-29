import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SpotifyService} from '../services/spotify.service';

@Component({
  selector: 'app-register',
  providers: [ SpotifyService ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  spotifyConnected = false

  constructor(formBuilder: FormBuilder, private router: Router, private spotifyService: SpotifyService) {
    this.form = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  onSubmit(regData) {
    console.log(regData);
    //todo: register user
    this.router.navigate(['']);
  }
}
