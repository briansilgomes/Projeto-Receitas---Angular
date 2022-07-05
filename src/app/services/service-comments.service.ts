import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classification } from '../class/classification';
import { Commentmaster } from '../class/commentmaster';
import { Comments } from '../class/comments';

@Injectable({
  providedIn: 'root'
})
export class ServiceCommentsService {

  serverUrl = environment.newBaseUrl
  httpOptions = { headers: new HttpHeaders({'Content-Type':'application/json'})}
  
  constructor(private clientehttp:HttpClient) { }

  getComments(id:number):Observable<Comments[]>{
    
    return this.clientehttp.get<any>(this.serverUrl + 'comments/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getClassification(id:number):Observable<Classification>{
    
    return this.clientehttp.get<any>(this.serverUrl + 'comments/media/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  addComment(comment:Commentmaster):Observable<Commentmaster>{
    return this.clientehttp.post<any>(this.serverUrl + 'comments', JSON.stringify(comment), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
    
  }

  private handleError(error: HttpErrorResponse) {
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