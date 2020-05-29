import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class SpotifyService {

  baseUrl = environment.baseUrl;
  headers;

  constructor(private _http: HttpClient, private authenticationService: AuthenticationService){
    this.headers = this.authenticationService.buildAuthedHeader()
  }

  promptSpotifyAuth(): Observable<any> {
    return this._http.post(this.baseUrl + '/api/spotify/auth', {}, {headers: this.headers})
  }

  accesscodeFromCode(code): Observable<any> {
    return this._http.post(this.baseUrl + '/api/spotify/auth/code', {code: code}, {headers: this.headers})
  }

  checkSpotifyConneced(): Observable<any> {
    return this._http.get(this.baseUrl + '/api/spotify/auth/is-connected', {headers: this.headers})
  }

  getUserDetails(): Observable<any> {
    return this._http.get(this.baseUrl + '/api/spotify/user', {headers: this.headers})

  }
}
