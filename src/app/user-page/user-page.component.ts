import { Component, OnInit } from '@angular/core';
import {UserPageService} from '../services/user-page.service';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../services/spotify.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  spotifyConnected = false

  constructor(private userPageService: UserPageService, private spotifyService: SpotifyService) { }

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
