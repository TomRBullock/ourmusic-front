import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserPageService} from '../services/user-page.service';
import {SpotifyService} from '../services/spotify.service';
import {MatDialog} from '@angular/material/dialog';
import {RoomCreateDialogComponent} from './room-create-dialog/room-create-dialog.component';
import {MatTable} from '@angular/material/table';
import {UserPageRoomListDatasource} from './user-page-room-list.datasource';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>

  spotifyConnected = false

  constructor(private userPageService: UserPageService, private spotifyService: SpotifyService, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  displayedColumns = ['name', 'active', 'playingSong', 'code', 'options']
  roomList;

  ngOnInit(): void {
    this.loadUserRooms()
  }

  loadUserRooms(): void {
    this.roomList = new UserPageRoomListDatasource(this.userPageService)
    this.changeDetectorRefs.detectChanges();

  }

  createRoom(): void {
    this.dialog.open(RoomCreateDialogComponent,{
      minWidth: '250px',
      minHeight: '150px'
    })
      .afterClosed().subscribe(
        result => {
          console.log('The dialog was closed');
          this.loadUserRooms()
        });
  }

  changePassword(): void {
    //open model. Accept new password
  }

  toggleRoomActivated(room) {
    this.userPageService.toggleActive(room.id)
      .subscribe(
        data => {
            this.loadUserRooms()
        }
      )
  }

  togglePlay() {
    this.userPageService.togglePlay()
      .subscribe(
        data => {
          if (data) {
            this.loadUserRooms()
          } else {
            this.snackBar.open("Error changing play state for room. Try again", '',{
              duration: 10000
            });
          }
        }
      )
  }

  deleteRoom(room) {
    this.userPageService.deleteRoom(room.id)
      .subscribe(
        data => {
          if (data) {
            this.loadUserRooms()
          } else {
            this.snackBar.open("Error deleting room. Try again", '',{
              duration: 10000
            });
          }
        }
      )
  }

}
