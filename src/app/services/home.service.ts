import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class HomeService {

  baseUrl = environment.baseUrl;

  constructor(private _router: Router, private _http: HttpClient){}

  checkRoomExists(roomCode: String): Observable<any> {
    return this._http.get(this.baseUrl + `/api/room/${roomCode}/validate`)
  }
}
