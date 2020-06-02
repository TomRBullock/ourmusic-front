import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../services/spotify.service';

@Component({
  selector: 'app-spotify-connect',
  providers: [ SpotifyService ],
  templateUrl: './spotify-connect.component.html',
  styleUrls: ['./spotify-connect.component.css']
})
export class SpotifyConnectComponent implements OnInit {

  spotifyConnected = false
  userDetails = {
    displayName: ""
  }

  constructor(private router: Router, private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit(): void {

    this.spotifyService.checkSpotifyConneced()
      .subscribe(
        data => {
          if (data) {
            this.spotifyConnected=true
            this.spotifyService.getUserDetails()
              .subscribe(
                data => {
                  this.spotifyConnected = true
                  this.userDetails = data
                },
                error => {
                  this.spotifyConnected = false
                }
              )
          } else {
            this.getAccessFromRedirect()
          }
        }
      )

  }

  connectSpotify(): void {
    this.spotifyService.promptSpotifyAuth()
      .subscribe(
        (result) => {
          window.location.href = result.uri
        }
      )
  }

  getAccessFromRedirect(): void {
    this.route
      .queryParams.subscribe(params => {

        let code = params['code'];
        if ((code != undefined || code != null) && this.spotifyConnected == false) {
          this.spotifyService.accesscodeFromCode(code)
            .subscribe(
              data => {
                this.spotifyConnected = true
                this.userDetails = data
              },
              error => {
                this.spotifyConnected = false
              }
            )
        }
    })
  }


}
