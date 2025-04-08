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

  //getAllUser
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlApi+"user/public/username/all");
  }

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

  //actualizar usuario mediante username
  updateUser(username:String, user:User):Observable<User>{
    return this.http.put<User>(environment.urlApi+"user/admin/"+username, user).pipe(
      catchError(this.handleError)
    )
  }

  updateRoleAdmin(username:String):Observable<any>{
    return this.http.put<any>(environment.urlApi+"user/admin/setAdmin/"+username, {}, { responseType: 'text' as 'json' } ).pipe(
      catchError(this.handleError)
    )
  }

  updateRoleBodega(username:String):Observable<any>{
    return this.http.put<any>(environment.urlApi+"user/admin/setBodega/"+username, {}, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }

  updateRoleCajero(username:String):Observable<any>{
    return this.http.put<any>(environment.urlApi+"user/admin/setCajero/"+username, {}, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }

  updateRoleUser(username:String):Observable<any>{
    return this.http.put<any>(environment.urlApi+"user/admin/setUsuario/"+username,{}, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }

  //verificar si usuario existe
  checkUser(username:String):Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/admin/exists/"+username).pipe(
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
