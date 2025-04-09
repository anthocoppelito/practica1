import { Component, inject } from '@angular/core';
import { User } from '../../../services/auth/user';
import { UserService } from '../../../services/user/user.service';
import { environment } from '../../../../assets/environments/environment';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  
  errorMessage : String ="";
  user?:User;
  usuario:String="";
  user2?:User;

  constructor(private userService:UserService, private authService: AuthService){

    this.usuario=authService.getUserFromToken(); // Obtener el usuario desde el servicio

    this.userService.getUserbyUsername(this.usuario).subscribe({
      next: (userData2)  => {
        this.user2=userData2;
      },
      error: (errorData) => {
        this.errorMessage=errorData;
      },
      complete: () => {
        //console.info("Usuario nuevo ok");
      }
    })







    
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user=userData;
      },
      error: (errorData) =>{
        this.errorMessage=errorData;
      },
      complete: () =>{
        //console.info("User data ok");
      }
    })
  }

}
