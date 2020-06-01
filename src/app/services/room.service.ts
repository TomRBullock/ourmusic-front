import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl = environment.baseUrl;

  constructor(private _router: Router, private _http: HttpClient){}

  getRoom(roomCode: string): Observable<any> {
    return this._http.get<string>(this.baseUrl + `/api/room/${roomCode}`);
  }

  getRoomQueue(roomCode: string) {
    return this._http.get(this.baseUrl + `/api/room/${roomCode}/queue`)
  }

  search(searchText: string, type: string, roomCode: string): Observable<any> {

    let params = new HttpParams()
      .append('type', type)
      .append('searchTerm', searchText)
      .append('roomCode', roomCode)

    return this._http.get(this.baseUrl + '/api/spotify/search', {params: params})
  }

  addSongToQueue(roomCode: string, track): Observable<any> {
    return this._http.post(this.baseUrl + `/api/room/${roomCode}/queue`, {track: track} )
  }

}
