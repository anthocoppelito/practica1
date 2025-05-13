import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../services/product/product';
import { ProductService } from '../../../../services/product/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {
  
  stock(arg0: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Funcionalidad no disponible',
      text: 'Funcionalidad no disponible',
      confirmButtonText: 'Aceptar',
    })

  }

  editar(arg0: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Funcionalidad no disponible',
      text: 'Funcionalidad no disponible',
      confirmButtonText: 'Aceptar',
    })                
                  
  }
  products: Product[] = []; // Lista de productos

    constructor(
      private productService: ProductService,
      private router: Router
    ){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data; // Asignar los productos a la variable
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
  })
  }
}
