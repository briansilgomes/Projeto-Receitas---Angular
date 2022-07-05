import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Ingredient } from '../class/ingredient';
import { Recipeingredient } from '../class/recipeingredient';
import { Temp } from '../class/temp';
import { Templist } from '../class/templist';

@Injectable({
  providedIn: 'root',
})
export class ServiceIngredientsService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {}

  getIngredient(): Observable<Ingredient[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'ingredient')
      .pipe(catchError(this.handleError));
  }

  getIngredientId(id: number): Observable<Ingredient> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'ingredient/' + id)
      .pipe(catchError(this.handleError));
  }

  getIngredientRecipe(id: number): Observable<Recipeingredient[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'ingredient/ingredientrecipe/' + id)
      .pipe(catchError(this.handleError));
  }

  getIngredientSearch(search: string): Observable<Ingredient[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'ingredient/search/' + search)
      .pipe(catchError(this.handleError));
  }

  createIngredient(ingre: Ingredient): Observable<Ingredient> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'ingredient',
        JSON.stringify(ingre),
        this.httpOptions
      )

      .pipe(catchError(this.handleError));
  }

  editIngredient(ingre: Ingredient): Observable<Ingredient> {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'ingredient',
        JSON.stringify(ingre),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  validateIngredient(ingre: Ingredient): Observable<Ingredient> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'ingredient/validate',
        JSON.stringify(ingre),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Tabela Temporária - pre-adicionar ingredientes às receitas

  addTemp(ingre: Temp): Observable<Temp> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'ingredient/temporary',
        JSON.stringify(ingre),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  removeTemp(idtemp: number): Observable<Temp> {
    return this.clientehttp
      .delete<any>(this.serverUrl + 'ingredient/temporary/' + idtemp)
      .pipe(catchError(this.handleError));
  }

  removeAll(): Observable<Temp> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipeingredient/' + environment.iduser)
      .pipe(catchError(this.handleError));
  }

  removeAllReal(idrecipe: number) {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipeingredient/removeall/' + idrecipe)
      .pipe(catchError(this.handleError));
  }

  getTemp(id: number): Observable<Templist[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'ingredient/temp/' + id)
      .pipe(catchError(this.handleError));
  }

  getRealTemp(idrecipe: number): Observable<Templist[]> {
    return this.clientehttp
      .get<any>(
        this.serverUrl +
          'ingredient/realtotemp/' +
          idrecipe +
          '/' +
          environment.iduser
      )
      .pipe(catchError(this.handleError));
  }

  sendTempReal(idrecipe: number) {
    return this.clientehttp
      .get<any>(
        this.serverUrl +
          'recipeingredient/' +
          idrecipe +
          '/' +
          environment.iduser
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
