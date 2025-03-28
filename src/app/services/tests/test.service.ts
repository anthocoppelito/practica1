import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  // getTest():Observable<String>{
  //   return this.http.get<String>(environment.urlHost+"auth/test").pipe(
  //     catchError(this.handleError)
  //   )
  // }

  getTest(): Observable<string> {
    return this.http.get(environment.urlHost + "auth/test", { responseType: 'text' }).pipe(
        catchError(this.handleError)
    );
}

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
      return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
    }


}
