import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ProductTableComponent } from "../../components/bodega/get/product-table/product-table.component";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CatMarcasComponent } from "../../components/bodega/llantas/get/cat-marcas/cat-marcas.component";
import { CatModelosComponent } from "../../components/bodega/llantas/get/cat-modelos/cat-modelos.component";
import { CatMovimientosinventarioComponent } from "../../components/bodega/llantas/get/cat-movimientosinventario/cat-movimientosinventario.component";
import { CatRinesComponent } from "../../components/bodega/llantas/get/cat-rines/cat-rines.component";
import { CtlInventariollantasComponent } from "../../components/bodega/llantas/get/ctl-inventariollantas/ctl-inventariollantas.component";
import { CtlMovimientosinventarioComponent } from "../../components/bodega/llantas/get/ctl-movimientosinventario/ctl-movimientosinventario.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [FormsModule,ProductTableComponent, CatMarcasComponent, CatModelosComponent, CatMovimientosinventarioComponent, CatRinesComponent, CtlInventariollantasComponent, CtlMovimientosinventarioComponent],
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
    selectedCard: string = 'todos'; // valores: 'todos', 'marca', 'modelo', 'categoria', 'rines', 'inventario', 'control'
  
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
