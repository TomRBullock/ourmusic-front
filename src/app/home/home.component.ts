import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../animations';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HomeService} from '../services/home.service';

@Component({
  selector: 'app-home',
  providers: [ HomeService ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ slideInAnimation ]
})
export class HomeComponent {

  form: FormGroup;

  constructor(form: FormBuilder, private router: Router, public _snackBar: MatSnackBar, private homeService: HomeService) {
    this.form = form.group({
      code: new FormControl('', Validators.required)
    });
  }

  routeToRoom(data) {
    this.homeService.checkRoomExists(data.code)
      .subscribe(
        (result) => {
          if (result) {
            this.router.navigate(['room', data.code ]);
          } else {
            this._snackBar.open("Invalid Room Code", '',{
              duration: 10000
            });
          }
        },
        error => {
          console.log(error)
          this._snackBar.open("Something went wrong. Please try again", '',{
            duration: 10000
          });
        }
      );
  }

}
