import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterComponent } from "../../components/admin/post/register/register.component";
import { UserTableComponent } from "../../components/admin/get/user-table/user-table.component";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RegisterComponent, UserTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  //variable local
  userLoginOn: boolean = false;

  // inyectar servicio
  constructor(
    private authService: AuthService,
    private titleService: Title,
    private router: Router
  ){

    this.titleService.setTitle('ADMIN'); 
  }

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

  registrar(){
    this.router.navigate(['admin/registrar']);
  }

}
