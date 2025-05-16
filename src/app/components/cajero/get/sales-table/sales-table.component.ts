import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../../services/sale/sale.service';
import { Router } from '@angular/router';
import { Sale } from '../../../../services/sale/sale';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.css'
})
export class SalesTableComponent implements OnInit {

  detalle(saleid: number) {
    this.router.navigate(['/cajero/detalle', saleid]);

  }



  // Variable local
  userLoginOn: boolean = false;


  sales: Sale[] = []; // Lista de ventas
  // Inyectar servicio
  constructor(
    private saleService : SaleService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.saleService.getAllSales().subscribe({
      next: (data) => {
        this.sales = data; // Asignar las ventas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las ventas:', err);
      }
    })
    this.saleService.saleRegistered$.subscribe(() => {
    this.cargarVentas(); // tu método para recargar la tabla
    });
  }

  
  cargarVentas() {
    this.saleService.getAllSales().subscribe({
      next: (data) => {
        this.sales = data; // Asignar las ventas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las ventas:', err);
      }
    })
  }
}
