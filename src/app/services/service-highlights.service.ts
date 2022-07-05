import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Highlight } from '../class/highlight';
import { Recipes } from '../class/recipes';

@Injectable({
  providedIn: 'root',
})
export class ServiceHighlightsService {
  constructor(private clientehttp: HttpClient) {}

  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getRecipes(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'highlight')
      .pipe(catchError(this.handleError));
  }

  getRecipesAdm(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'highlight/admhighlight')
      .pipe(catchError(this.handleError));
  }

  sendHighlights(highlight: Highlight) {
    return this.clientehttp
      .post<any>(this.serverUrl + 'highlight', highlight, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  removeHighlights(recipe: Recipes) {
    return this.clientehttp
      .delete<any>(this.serverUrl + 'highlight/' + recipe.idrecipe)

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
