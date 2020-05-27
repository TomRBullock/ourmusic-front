import { environment } from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user.model';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  constructor(
    private _router: Router, private _http: HttpClient){}

  obtainAccessToken(loginData): Observable<any>{
    let params = new HttpParams()
      .append('username', loginData.username)
      .append('password', loginData.password)
      .append('grant_type','password')
      .append('scope', '')
      .append('client_id','SampleClientId')
      .append('client_secret','my-secret')

    let headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Accept', 'application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Basic ' + btoa("SampleClientId:my-secret"));

    return this._http.post(this.baseUrl +'/oauth/token',
      params.toString(), {headers: headers})
      // .map(res => res.json())

  }

  saveToken(token){
    console.log("save token: ", token)
    // var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    this._router.navigate(['/']);
  }

  getResource(resourceUrl): Observable<User> {
    let headers = new HttpHeaders()
      .append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Bearer '+ localStorage.getItem('access_token'));

    return this._http.get<User>(this.baseUrl + resourceUrl, {headers: headers});
  }

  checkLoginState(): boolean{
    if (localStorage.getItem('access_token') === null){
      // this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }

  public static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
