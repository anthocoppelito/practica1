import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../assets/environments/environment';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  user?: User;
  errorMessage : String ="";
  userRole: string | null = null; // Variable para almacenar el rol
  userLoginOn: boolean = false;
  constructor(private authService: AuthService, private userService:UserService){}


  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    );

    // Suscribirse al rol del usuario
    this.authService.userRole$.subscribe({
      next: (role) => {
        this.userRole = role; // Actualiza el rol del usuario
        console.log('Rol del usuario:', role);
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
          console.info("User data ok");
        }
      }
    )

  }

  cerrarSesion(){
    this.authService.logout();
  }

}
