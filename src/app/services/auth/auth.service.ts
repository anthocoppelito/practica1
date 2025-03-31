import { Injectable } from '@angular/core';
import { environment } from '../../../assets/environments/environment';
import { Router } from '@angular/router'; // Importa el Router
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';



export interface JwtPayload {
  sub: string; // El username
  role: string; // El rol del usuario
  exp: number;  // Fecha de expiración del token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = environment.urlHost + 'auth/login'
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userRoleSubject = new BehaviorSubject<string | null>(null); // BehaviorSubject para el rol
  userRole$ = this.userRoleSubject.asObservable(); // Observable para el rol
  

  constructor(private http: HttpClient, private router: Router) {

    this.currentUserLoginOn = new BehaviorSubject<boolean>(localStorage.getItem("authToken")!=null);
    this.updateUserRole(); // Inicializa el rol del usuario al cargar el servicio
   }

   updateUserRole(): void {
    const role = this.getRoleFromToken(); // Obtén el rol desde el token
    this.userRoleSubject.next(role); // Actualiza el BehaviorSubject
  }

  login(loginRequest: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.urlAuth, loginRequest).pipe(
      tap((userData) => {
        this.saveToken(userData.token);
        this.currentUserLoginOn.next(true);
        this.updateUserRole();
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
    this.currentUserLoginOn.next(false);
    this.userRoleSubject.next(null); // Limpiar el rol
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getRoleFromToken(): string {
    const token = this.getToken(); // Obtén el token del localStorage
    if (token){
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.role;
    }else{
      return "null"; // Si no hay token, retorna null
    }
  }

}

// sessionStorage es informacion temporal, y al cerrar la pestaña se elimina
// localStorage es informacion mas persistente entre pestañas, incluso despues de cerrar el navegador. (duraria depende lo que el token dure)

//localStorage.setItem("authToken",userData.token);
        //this.saveToken(userData.token); //ambas lineas significan lo mismo, pero ya se hace en savetoken.