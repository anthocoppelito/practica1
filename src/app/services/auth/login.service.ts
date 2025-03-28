import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { environment } from '../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    )
    //console.log(credentials)
  }
  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }else{
      console.error('Backend regreso un codigo de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo fallo, intenta nuevamente'));

  }
  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get UserLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  //cerrarsesion- pone el currentUserLogin en false para todos los componentes a los cuales estan suscritos a el
  setUserCerrarSesion() {
    this.currentUserLoginOn.next(false);
  }

  //vaciarInfoUsuario
  // setCleanUserData(){
  //   this.currentUserData.next({id:0,username:''})
  // }
}
