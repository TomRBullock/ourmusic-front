import { environment } from '../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {User} from './model/user';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  constructor(
    private _router: Router, private _http: HttpClient){}

  obtainAccessToken(loginData){
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

    console.log(params, headers);

    this._http.post(this.baseUrl +'/oauth/token',
      params.toString(), {headers: headers})
      // .map(res => res.json())
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials'));
  }

  saveToken(token){
    console.log("save token: ", token)
    // var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    this._router.navigate(['/']);
  }

  getResource(resourceUrl): Observable<User> {
    // var headers =
      new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token')});

    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('Authorization', 'Bearer '+ localStorage.getItem('access_token'));

    return this._http.get<User>(this.baseUrl + resourceUrl, {headers: headers})
      .pipe(
        retry(3),
        catchError(AuthenticationService.handleError)
      )
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

  private static handleError(error: HttpErrorResponse) {
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
