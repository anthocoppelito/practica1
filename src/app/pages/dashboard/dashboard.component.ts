import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonalDetailsComponent } from "../../components/all/personal-details/personal-details.component";
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/auth/user';
import { ChangePasswordComponent } from "../../components/all/change-password/change-password.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PersonalDetailsComponent, ChangePasswordComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  errorMessage : String ="";
  usuario:String="";
  user2?:User;
  userLoginOn: boolean = false;
  constructor(private authService: AuthService, private userService: UserService){

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
  }

  
  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe(
      { 
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

}
