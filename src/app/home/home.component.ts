import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../animations';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ slideInAnimation ]
})
export class HomeComponent {

  form: FormGroup;

  constructor(form: FormBuilder, private router: Router, public _snackBar: MatSnackBar) {
    this.form = form.group({
      code: new FormControl('', Validators.required)
    });
  }

  routeToRoom(data) {
    console.log(data)
    if (this.checkValidityOfRoomCode()) {
      this.router.navigate(['room', data.code ]);
    } else {
      this._snackBar.open("Invalid Room Code", '',{
        duration: 10000
      });
    }
  }

  checkValidityOfRoomCode(): boolean {
    //todo: service request for room code is active
    return true;
  }
}
