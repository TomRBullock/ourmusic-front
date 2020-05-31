import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  baseUrl = environment.baseUrl;
  headers;

  constructor(private _http: HttpClient, private authenticationService: AuthenticationService){
    this.headers = this.authenticationService.buildAuthedHeader()

  }

  loadUserRooms(): Observable<any> {
    return this._http.get(this.baseUrl + '/api/room/admin', {headers: this.headers})
  }

  createNewRoom(roomName: string): Observable<any> {
    return this._http.post(this.baseUrl + '/api/room/admin', {roomName: roomName}, {headers: this.headers})
  }

  deleteRoom(roomId: string): Observable<any> {
    let params = new HttpParams().append('roomId', roomId)
    return this._http.delete(this.baseUrl + '/api/room/admin', {headers: this.headers, params: params})
  }

  toggleActive(roomId: string): Observable<any> {
    return this._http.post(this.baseUrl + '/api/room/admin/activate', {roomId: roomId}, {headers: this.headers})
  }

  togglePlay(): Observable<any> {
    return this._http.post(this.baseUrl + '/api/room/admin/toggle-play', {}, {headers: this.headers})
  }

}
