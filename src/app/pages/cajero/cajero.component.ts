import { Component } from '@angular/core';
import { SalesTableComponent } from "../../components/cajero/get/sales-table/sales-table.component";
import { Router } from '@angular/router';
import { RegisterSaleComponent } from "../../components/cajero/post/register-sale/register-sale.component";

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [SalesTableComponent, RegisterSaleComponent],
  templateUrl: './cajero.component.html',
  styleUrl: './cajero.component.css'
})
export class CajeroComponent {
  actualizar() {
    
  }

  

  limpiar() {
    localStorage.removeItem('llantasParaVenta');
    this.router.navigate(['/cajero']);

  }

  llantas() {
    this.router.navigate(['/cajero/llantas']);
  }

  constructor(
    private router: Router
  ){

  }
  
  

}
