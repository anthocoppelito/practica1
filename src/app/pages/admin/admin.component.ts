import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  //variable local
  userLoginOn: boolean = false;
  userData?:User;

  // inyectar servicio
  constructor(private loginService: LoginService){}
  // ngOnDestroy(): void {
  //   this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {
    //se suscribe al observable, y al obtener cambios se haran aqui tambien
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    );

    this.loginService.currentUserData.subscribe(
      {
        next: (userData) => {
          this.userData=userData;
        }
      }
    );
  }

}
