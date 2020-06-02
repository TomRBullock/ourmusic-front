import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {fadeInAfterLoad} from '../animations';
import {RoomService} from '../services/room.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {daLocale} from 'ngx-bootstrap/chronos';
import {UserPageRoomListDatasource} from '../user-page/user-page-room-list.datasource';
import {RoomSearchResultDatasource} from './room-search-result.datasource';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomQueueDatasource} from './room-queue.datasource';
import {RoomCurrentSongWebsocket} from '../services/websocket/room-current-song.websocket';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeInAfterLoad]
})
export class RoomComponent implements OnInit {

  currentRoomWebSocket: RoomCurrentSongWebsocket;

  mobile = false;
  load_completed: boolean = false;

  displayedColumns = ['position', 'trackName', 'artist']
  searchText = new Subject<string>();
  searchType: string = 'TRACK';
  textModel: string;
  searchResults;

  currentTrack;

  room;
  roomQueue;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private changeDetectorRefs: ChangeDetectorRef,
              public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.currentRoomWebSocket = new RoomCurrentSongWebsocket()

    this.route.paramMap
      .subscribe(
        params => {

          this.roomService.getRoom(params.get('code'))
            .subscribe(
              data => {
                this.room = data
                this.currentTrack = data.playingSong
              }
            )

          const _this = this;
          _this.currentRoomWebSocket._connect().connect({}, function (frame) {
            _this.currentRoomWebSocket._connect().subscribe("/topic/"+ _this.room.code +"/current-song", function (sdkEvent) {
              _this.currentTrack = JSON.parse(sdkEvent.body)
              // JSON.stringify(sdkEvent.body);
            });
            // _this.stompClient.reconnect_delay = 2000;
          }, );
        }
      )

    if (window.screen.width <= 700) { // 768px portrait
      this.mobile = true;
    }

    this.searchText
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(
        data => {
          console.log(data)
          this.search(data);
        }
      )

  }
  ngAfterContentChecked() {
    this.load_completed = true;
  }


  getCurrentSong() {}


  //searching
  search(searchText: string) {
    this.searchResults = new RoomSearchResultDatasource(this.roomService, searchText, this.searchType, this.room.code)
    this.changeDetectorRefs.detectChanges();
  }

  changeSearchText(searchText: string) {
    this.searchText.next(searchText)
  }

  changeSearchType(searchType) {
    this.searchType = searchType
  }

  addSongToQueue(track) {
    this.roomService.addSongToQueue(this.room.code, track)
      .subscribe(
        data => {
          if (data) {
            this.snackBar.open("Song added successfully", '',{
              duration: 5000
            });
            this.queue()
          } else {
            this.snackBar.open("Song failed to add", '',{
              duration: 5000
            });
          }
        }
      )
  }

  //Queue
  queue() {
    this.roomQueue = new RoomQueueDatasource(this.roomService, this.room.code)
    this.changeDetectorRefs.detectChanges();
  }

  //websocket


  getPlaybackProgress() {
    return (this.currentTrack.progressMs / this.currentTrack.track.durationMs) * 100
  }
}


