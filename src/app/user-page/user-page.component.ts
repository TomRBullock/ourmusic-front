import { Component, OnInit } from '@angular/core';
import {UserPageService} from '../services/user-page.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  spotifyConnected = false

  constructor(private userPageService: UserPageService) { }

  displayedColumns = ['name', 'active', 'playingSong']
  roomList = []

  ngOnInit(): void {
  }

  loadUserRooms(): void {

    this.userPageService

    //get user rooms
    //set roomList
  }

  createRoom(): void {
    //create room
    //add to roomList (top)
    //open model. Accept Room Name,
  }

  changePassword(): void {
    //open model. Accept new password
  }

}
