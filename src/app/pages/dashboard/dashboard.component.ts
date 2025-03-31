import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { LoginService } from '../../services/auth/login.service';
import { PersonalDetailsComponent } from "../../components/personal-details/personal-details.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PersonalDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userLoginOn: boolean = false;
  constructor(private authService: AuthService){}

  
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
