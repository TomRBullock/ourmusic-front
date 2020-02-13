import { Component, OnInit } from '@angular/core';
import { searchBoxOpenClose } from '../animations';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [ searchBoxOpenClose ]
})
export class RoomComponent implements OnInit {

  expanded = false;

  model: {
    searchText: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSearchClick() {
    this.expanded = !this.expanded;
  }

}
