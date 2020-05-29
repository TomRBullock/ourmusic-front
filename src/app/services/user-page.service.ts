import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient){}

  loadUserRooms(): Observable<any> {
    return this._http.get(this.baseUrl + '', {})
  }

}
