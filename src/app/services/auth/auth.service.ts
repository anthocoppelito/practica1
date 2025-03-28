import { Injectable } from '@angular/core';
import { environment } from '../../../assets/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private urlAuth = environment.urlHost + 'auth/login'
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

    this.currentUserLoginOn = new BehaviorSubject<boolean>(localStorage.getItem("authToken")!=null);
   }

  login(loginRequest: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.urlAuth, loginRequest).pipe(
      tap((userData) => {
        this.currentUserLoginOn.next(true);
      }),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
      if(error.status===0){
        console.error('Se ha producido un error ', error.error);
      }else{
        console.error('Backend regreso un codigo de estado ', error.status, error.error);
      }
      return throwError(()=> new Error('Algo fallo, intenta nuevamente'));
  
    }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}

// sessionStorage es informacion temporal, y al cerrar la pestaña se elimina
// localStorage es informacion mas persistente entre pestañas, incluso despues de cerrar el navegador. (duraria depende lo que el token dure)

//localStorage.setItem("authToken",userData.token);
        //this.saveToken(userData.token); //ambas lineas significan lo mismo, pero ya se hace en savetoken.