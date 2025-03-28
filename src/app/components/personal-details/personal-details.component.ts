import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../assets/environments/environment';

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

  constructor(private userService:UserService){

    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user=userData;
      },
      error: (errorData) =>{
        this.errorMessage=errorData;
      },
      complete: () =>{
        console.info("User data ok");
      }
    })
  }

}
