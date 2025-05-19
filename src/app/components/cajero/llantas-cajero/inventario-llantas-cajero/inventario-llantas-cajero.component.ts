import { Component } from '@angular/core';
import { CtlInventariollantasComponent } from "../../../bodega/llantas/get/ctl-inventariollantas/ctl-inventariollantas.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-llantas-cajero',
  standalone: true,
  imports: [CtlInventariollantasComponent],
  templateUrl: './inventario-llantas-cajero.component.html',
  styleUrl: './inventario-llantas-cajero.component.css'
})
export class InventarioLlantasCajeroComponent {

  constructor(
      private router: Router
    ){}
  venta() {
    this.router.navigate(['/cajero']);
  }


}
