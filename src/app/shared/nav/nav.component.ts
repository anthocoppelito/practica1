import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../assets/environments/environment';
import { User } from '../../services/auth/user';
import { PerfilComponent } from "../../components/all/nav/perfil/perfil.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, PerfilComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  user?: User;
  errorMessage : String ="";
  userRole: string | null = null; // Variable para almacenar el rol
  nombreUsuario: string | null = null;
  userLoginOn: boolean = false;

  




  constructor(
    private authService: AuthService, 
    private userService:UserService,
    private router: Router
  ){
    
  }
 

  ngOnInit(): void {
    
    this.authService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    );

    // Suscribirse al username del usuario
    this.authService.userName$.subscribe({
      next: (username) => {
        this.nombreUsuario = username; // Actualiza el rol del usuario
        //console.log('username del usuario:', this.nombreUsuario);
      }
    });

    // Suscribirse al rol del usuario
    this.authService.userRole$.subscribe({
      next: (role) => {
        this.userRole = role; // Actualiza el rol del usuario
        //console.log('Rol del usuario:', role);
      }
    });

    this.userService.getUser(environment.userId).subscribe(
      {
        next: (userData) => {
          this.user=userData;
        },
        error: (errorData) =>{
          this.errorMessage=errorData;
        },
        complete: () =>{
          //console.info("User data ok");
        }
      }
    )

  }

  cerrarSesion(){
    this.authService.logout();
    this.nombreUsuario="";
  }

  perfil(){
    this.router.navigate(['/perfil']);
  }

}
