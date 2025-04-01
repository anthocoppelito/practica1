import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //getUser by id
  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/public/"+id).pipe(
      catchError(this.handleError)
    )
  }

  //getUser by username
  getUserbyUsername(username:String):Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/public/username/"+username).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
