import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Login } from '../class/login';
import { User } from '../class/user';
import { Usermaster } from '../class/usermaster';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsersService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'users')
      .pipe(catchError(this.handleError));
  }

  getUserEmail(user: string): Observable<User> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'users/' + user)
      .pipe(catchError(this.handleError));
  }

  getUserID(iduser: number): Observable<Usermaster> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'users/id/' + iduser)
      .pipe(catchError(this.handleError));
  }

  getSearch(search: string): Observable<User[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'users/search/' + search)
      .pipe(catchError(this.handleError));
  }

  getHome(iduser: number): Observable<User> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'users/userhome/' + iduser)
      .pipe(catchError(this.handleError));
  }

  lookUser(user: User) {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'users/look',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  unLookUser(user: User) {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'users/unlook',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  loginUser(login: Login) {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'users/login',
        JSON.stringify(login),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addUser(user: Usermaster): Observable<Usermaster> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'users',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  editUser(user: Usermaster): Observable<Usermaster> {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'users',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Algo correu mal, tente novamente mais tarde!')
    );
  }
}
