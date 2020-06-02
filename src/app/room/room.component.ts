import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {fadeInAfterLoad} from '../animations';
import {RoomService} from '../services/room.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {RoomSearchResultDatasource} from './room-search-result.datasource';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomQueueDatasource} from './room-queue.datasource';
import {WebSocketBuilder} from '../services/websocket/web-socket-builder';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeInAfterLoad]
})
export class RoomComponent implements OnInit {

  currentRoomWebSocket: WebSocketBuilder;
  queueWebSocket: WebSocketBuilder;
  queueVoteWebSocket: WebSocketBuilder;

  mobile = false;
  load_completed: boolean = false;

  displayedColumns = ['trackName', 'artist', 'votes']
  searchText = new Subject<string>();
  searchType: string = 'TRACK';
  textModel: string;
  searchResults;

  currentTrack;

  room;
  roomQueue;
  localVotedTracks = [];

  constructor(private route: ActivatedRoute, private roomService: RoomService,
              private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.currentRoomWebSocket = new WebSocketBuilder()
    this.queueWebSocket       = new WebSocketBuilder()
    this.queueVoteWebSocket   = new WebSocketBuilder()

    this.route.paramMap
      .subscribe(
        params => {

          this.roomService.getRoom(params.get('code'))
            .subscribe(
              data => {
                this.room = data
                this.roomQueue = data.queue
                this.currentTrack = data.playingSong
              }
            )

          //--- websockets
          //Current Song
          const _this = this;
          _this.currentRoomWebSocket._connect().connect({}, function (frame) {
            _this.currentRoomWebSocket._connect().subscribe("/topic/"+ _this.room.code +"/current-song", function (sdkEvent) {
              _this.currentTrack = JSON.parse(sdkEvent.body)
            });
            // _this.stompClient.reconnect_delay = 2000;
          }, _this.currentRoomWebSocket.errorCallBack);

          //Queue
          _this.queueWebSocket._connect().connect({}, function (frame) {
            _this.queueWebSocket._connect().subscribe("/topic/"+ _this.room.code +"/queue", function (sdkEvent) {
              _this.roomQueue = JSON.parse(sdkEvent.body)
              // JSON.stringify(sdkEvent.body);
            });
            // _this.stompClient.reconnect_delay = 2000;
          }, _this.queueWebSocket.errorCallBack);


          // //Queue Voting
          // _this.queueVoteWebSocket._connect().connect({}, function (frame) {
          //   _this.queueVoteWebSocket._connect().subscribe("/topic/"+ _this.room.code +"/queue/vote", function (sdkEvent) {
          //     _this.currentTrack = JSON.parse(sdkEvent.body)
          //     // JSON.stringify(sdkEvent.body);
          //   });
          //   // _this.stompClient.reconnect_delay = 2000;
          // }, _this.queueVoteWebSocket.errorCallBack);


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
            // this.queue()
          } else {
            this.snackBar.open("Song failed to add", '',{
              duration: 5000
            });
          }
        }
      )
  }




  getPlaybackProgress() {
    return (this.currentTrack.progressMs / this.currentTrack.track.durationMs) * 100
  }
}


