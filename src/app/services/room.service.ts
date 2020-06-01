import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class RoomService {

  baseUrl = environment.baseUrl;

  constructor(private _router: Router, private _http: HttpClient){}

  getRoom(roomId: String): Observable<any> {
    return this._http.get<string>(this.baseUrl + "/api/room");
  }

}
