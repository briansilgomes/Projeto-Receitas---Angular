import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Recipemaster } from '../class/recipemaster';
import { Recipes } from '../class/recipes';

@Injectable({
  providedIn: 'root',
})
export class ServiceRecipesService {
  serverUrl = environment.newBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private clientehttp: HttpClient) {}

  getRecipes(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes')
      .pipe(catchError(this.handleError));
  }

  getRecipeId(id: number): Observable<Recipes> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/' + id)
      .pipe(catchError(this.handleError));
  }

  getRecipeValidate(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/validate')
      .pipe(catchError(this.handleError));
  }

  getRecipeUser(): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/recipesuser/' + environment.iduser)
      .pipe(catchError(this.handleError));
  }

  validateRecipe(recipe: Recipes): Observable<Recipes> {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'recipes/va',
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addRecipe(recipe: Recipemaster): Observable<Recipemaster> {
    return this.clientehttp
      .post<any>(
        this.serverUrl + 'recipes/addrecipe',
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  editRecipe(recipe: Recipemaster): Observable<Recipemaster> {
    return this.clientehttp
      .put<any>(
        this.serverUrl + 'recipes/updaterecipe',
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getRecipe(idrecipe: number): Observable<Recipemaster> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/editrecipe/' + idrecipe)
      .pipe(catchError(this.handleError));
  }

  //Ordenações

  orderbyRecipeCategory(idcategory: number): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/orderby/' + idcategory)
      .pipe(catchError(this.handleError));
  }

  searchNameRecipe(namerecipe: string): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(this.serverUrl + 'recipes/searchname/' + namerecipe)
      .pipe(catchError(this.handleError));
  }

  orderbyState(idstate: number): Observable<Recipes[]> {
    return this.clientehttp
      .get<any>(
        this.serverUrl +
          'recipes/orderbystate/' +
          environment.iduser +
          '/' +
          idstate
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
