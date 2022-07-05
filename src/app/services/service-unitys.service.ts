import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Unitys } from '../class/unitys';

@Injectable({
  providedIn: 'root',
})
export class ServiceUnitysService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {}

  getUnitys(): Observable<Unitys[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'unitys')
      .pipe(catchError(this.handleError));
  }

  getUnityId(id: number): Observable<Unitys> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'unitys/' + id)
      .pipe(catchError(this.handleError));
  }

  getSearch(search: string): Observable<Unitys[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'unitys/search/' + search)
      .pipe(catchError(this.handleError));
  }

  createUnity(unity: Unitys): Observable<Unitys> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'unitys',
        JSON.stringify(unity),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  editUnity(unity: Unitys): Observable<Unitys> {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'unitys',
        JSON.stringify(unity),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  validateUnity(unity: Unitys): Observable<Unitys> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'unitys/validate',
        JSON.stringify(unity),
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
