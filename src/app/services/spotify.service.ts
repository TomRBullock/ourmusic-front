import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient){}

  promptSpotifyAuth(): Observable<any> {
    return this._http.post(this.baseUrl + '/api/spotify/auth', {})
  }


}
