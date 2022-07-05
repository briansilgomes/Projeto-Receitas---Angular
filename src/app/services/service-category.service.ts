import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category } from '../class/category';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

  constructor(private clientehttp:HttpClient) { }

  serverUrl = environment.newBaseUrl

  getCategory():Observable<Category[]>{
    return this.clientehttp.get<any>(this.serverUrl + 'category')
    .pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Algo correu mal, tente novamente mais tarde!'));
  }

}
