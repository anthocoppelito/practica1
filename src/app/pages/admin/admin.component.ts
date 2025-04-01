import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterComponent } from "../../components/admin/register/register/register.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  //variable local
  userLoginOn: boolean = false;

  // inyectar servicio
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    //se suscribe al observable, y al obtener cambios se haran aqui tambien
    this.authService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    );
  }

}
