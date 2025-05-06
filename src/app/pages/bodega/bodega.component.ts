import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ProductTableComponent } from "../../components/bodega/get/product-table/product-table.component";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent implements OnInit{

  addstock() {
    throw new Error('Method not implemented.');
  }

  registrar() {
    this.router.navigate(['bodega/registrar']);
  }

  //variable local
    userLoginOn: boolean = false;
  
    // inyectar servicio
    constructor(
      private authService: AuthService,
      private titleService: Title,
      private router: Router
    ){}
  
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
