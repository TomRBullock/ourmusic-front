import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {fadeInAfterLoad} from '../animations';
import {RoomService} from '../services/room.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {RoomSearchResultDatasource} from './room-search-result.datasource';
import {ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
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

  private routeSub: any;

  mobile = false;
  load_completed: boolean = false;

  displayedColumns = ['trackName', 'artist', 'votes']
  searchText = new Subject<string>();
  searchType: string = 'TRACK';
  textModel: string;
  searchResults;

  currentTrack;

  roomCode: string;
  room;
  roomQueue;
  localVotedTracks = [];
  localSkipVoted = {
    uri: "",
    voted: false
  }

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService,
              private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar) {

    this.route.paramMap
      .subscribe(
        params => {
          this.roomCode = params.get('code')
        })

    this.routeSub = this.router.events.subscribe(
      event => {
        if (event instanceof ActivationEnd && this.router.navigated) {
          this.roomService.updateUserEstimate(this.roomCode, true).subscribe()
        }
        if (event instanceof NavigationStart && this.router.navigated) {
          this.roomService.updateUserEstimate(this.roomCode, false).subscribe()
        }
      }
    )
  }

  ngOnInit(): void {

    // get room
    this.roomService.getRoom(this.roomCode)
      .subscribe(
        data => {
          this.room = data
          this.roomQueue = data.queue
          this.currentTrack = data.playingSong
        }
      )

    //--- websockets
    this.currentRoomWebSocket = new WebSocketBuilder()

    const _this = this;
    _this.currentRoomWebSocket._connect().connect({}, function (frame) {
      //Current Song
      _this.currentRoomWebSocket._connect().subscribe("/topic/"+ _this.roomCode +"/current-song", function (sdkEvent) {
        let newTrack = JSON.parse(sdkEvent.body)
        _this.currentTrack = newTrack
        if (newTrack.track.uri != _this.localSkipVoted.uri) {
          _this.localSkipVoted = {
            uri: newTrack.track.uri,
            voted: false
          }
        }
      });
      //Queue
      _this.currentRoomWebSocket._connect().subscribe("/topic/"+ _this.roomCode +"/queue", function (sdkEvent) {
        console.log("update queue")
        _this.roomQueue = JSON.parse(sdkEvent.body)
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, _this.currentRoomWebSocket.errorCallBack);


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
          this.search(data);
        }
      )

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.currentRoomWebSocket._disconnect()
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


  //voting
  addVote(track) {

    let trackObj = {
      uri: track.song.uri,
      timeAdded: track.timeAdded
    }

    this.localVotedTracks.push(trackObj)

    this.roomService.addQueueVote(this.room.code, track).subscribe()

  }

  removeVote(track) {
    let trackObj = {
      uri: track.song.uri,
      timeAdded: track.timeAdded
    }

    let index = this.localVotedTracks.findIndex(storedObj => trackObj === storedObj);
    this.localVotedTracks.splice(index, 1)

    this.roomService.removeQueueVote(this.room.code, track).subscribe()
  }

  hasVotedFor(track): boolean {
    return this.localVotedTracks.filter(storedObj => storedObj.timeAdded == track.timeAdded && storedObj.uri == track.song.uri).length > 0
  }

  voteSkip() {
    this.localSkipVoted.voted = true
    this.roomService.skipPlayingTrack(this.room.code).subscribe()

  }

  getPlaybackProgress() {
    return (this.currentTrack.progressMs / this.currentTrack.track.durationMs) * 100
  }
}


