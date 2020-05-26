import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../services/spotify.service';

@Component({
  selector: 'app-spotify-connect',
  providers: [ SpotifyService ],
  templateUrl: './spotify-connect.component.html',
  styleUrls: ['./spotify-connect.component.css']
})
export class SpotifyConnectComponent implements OnInit {

  spotifyConnected = false

  constructor(private router: Router, private spotifyService: SpotifyService) { }

  ngOnInit(): void { }

  connectSpotify(): void {
    //todo: spotify authenticator

    this.spotifyService.promptSpotifyAuth()
      .subscribe(
        (result) => {
          console.log("Result", result)
          window.location.href = result.uri
        }
      )
    // this.spotifyConnected = true;
    // this.form.controls['spotifyAuth'].setValue(true);
  }

}
