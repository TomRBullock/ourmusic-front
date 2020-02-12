import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ slideInAnimation ]
})
export class HomeComponent {

  options: FormGroup;
  colorControl = new FormControl('primary');
  roomCode: string;

  constructor(form: FormBuilder, private router: Router) {
    this.options = form.group({
      color: this.colorControl
    });
  }

  routeToRoom() {
    this.router.navigate(['/room/{}', { id: this.roomCode }]);
  }
}
