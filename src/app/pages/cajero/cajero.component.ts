import { Component } from '@angular/core';
import { SalesTableComponent } from "../../components/cajero/get/sales-table/sales-table.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [SalesTableComponent],
  templateUrl: './cajero.component.html',
  styleUrl: './cajero.component.css'
})
export class CajeroComponent {

  constructor(
    private router: Router
  ){

  }
  
  registrar() {
    this.router.navigate(['/cajero/registrar']);
  }

}
