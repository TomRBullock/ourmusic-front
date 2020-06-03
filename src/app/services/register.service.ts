import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = environment.baseUrl;

  constructor(private _router: Router, private _http: HttpClient){}

  registerUser(username: string, password: string): Observable<any> {
    let body = {
      username: username,
      password: password
    }
    return this._http.post(this.baseUrl + `/api/user/create`, body)
  }
}
