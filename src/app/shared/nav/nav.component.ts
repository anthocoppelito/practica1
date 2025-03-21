import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{


  userLoginOn: boolean = false;
  constructor(private loginService: LoginService){}

  // ngOnDestroy(): void {
  //   this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  cerrarSesion(){
    this.loginService.setCleanUserData();//limpiar info de usuario
    this.loginService.setUserCerrarSesion();//cerrar sesion
  }

}
