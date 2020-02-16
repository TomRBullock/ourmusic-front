import {Component, OnInit} from '@angular/core';
import {fadeInAfterLoad} from '../animations';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeInAfterLoad]
})
export class RoomComponent implements OnInit {

  mobile = false;
  load_completed: boolean = false;

  displayedColumns = ['position', 'trackName', 'artist']
  searchText = '';

  currentTrack = {
    name: 'Mr. Brightside',
    artistName: 'The Killers',
    durationMs: 245764,
    progressMs: 53480,
    fetchTimeStamp: 0,
    image: {
      url: 'https://i.scdn.co/image/8c1e066b5d1045038437d92815d49987f519e44f'
    }
  };

  roomQueue = [
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
    // {position: 1, name: 'Mr. Brightside', artist: 'The Killers'},
  ];

  constructor() {

  }

  ngOnInit(): void {
    if (window.screen.width <= 700) { // 768px portrait
      this.mobile = true;
    }
  }
  ngAfterContentChecked() {
    this.load_completed = true;
  }


  getCurrentSong() {}

  searchSong() {}

  playNextSong() {}

  getPlaybackProgress() {
    return (this.currentTrack.progressMs / this.currentTrack.durationMs) * 100
  }
}


