import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent implements OnInit{

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
