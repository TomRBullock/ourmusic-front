import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  options: FormGroup;
  colorControl = new FormControl('primary');

  constructor(form: FormBuilder) {
    this.options = form.group({
      color: this.colorControl
    });
  }

}
