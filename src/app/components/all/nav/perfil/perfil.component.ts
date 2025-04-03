import { Component } from '@angular/core';
import { User } from '../../../../services/auth/user';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  //user2?: User;
  username: string = "";
  userrol: string = "";
  errorMessage: String = "";

  constructor(private userService:UserService, private authService: AuthService){
  
      this.username=authService.getUserFromToken(); // Obtener el usuario desde el servicio
  
      this.userService.getUserbyUsername(this.username).subscribe({
        next: (userData2)  => {
          this.username=userData2.username;
          this.userrol=userData2.role;
        },
        error: (errorData) => {
          this.errorMessage=errorData;
        },
        complete: () => {
          console.info("Datos nav de perfil cargados correctamente");
        }
      })
    }

}
