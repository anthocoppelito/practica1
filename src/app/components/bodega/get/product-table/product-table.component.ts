import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../services/product/product';
import { ProductService } from '../../../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {
stock(arg0: number) {
throw new Error('Method not implemented.');
}
editar(arg0: string) {
throw new Error('Method not implemented.');
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
