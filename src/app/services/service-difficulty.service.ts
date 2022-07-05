import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Difficulty } from '../class/difficulty';

@Injectable({
  providedIn: 'root',
})
export class ServiceDifficultyService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {
    this.getDifficulty();
  }

  getDifficulty(): Observable<Difficulty[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'difficulty')
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
