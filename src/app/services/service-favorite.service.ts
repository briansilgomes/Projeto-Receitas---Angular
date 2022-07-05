import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Favoritemaster } from '../class/favoritemaster';
import { Recipes } from '../class/recipes';

@Injectable({
  providedIn: 'root',
})
export class ServiceFavoriteService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {}

  getFavorite(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'favorite/' + environment.iduser)
      .pipe(catchError(this.handleError));
  }

  addFavorite(favorite: Favoritemaster) {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'favorite',
        JSON.stringify(favorite),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  removeFavorite(idrecipe: number) {
    return this.clientehttp
      .delete<any>(this.serverUrl + 'favorite/' + idrecipe)
      .pipe(catchError(this.handleError));
  }

  checkFavorite(idrecipe: number) {
    return this.clientehttp
      .get<any>(
        this.serverUrl + 'favorite/' + idrecipe + '/' + environment.iduser
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
