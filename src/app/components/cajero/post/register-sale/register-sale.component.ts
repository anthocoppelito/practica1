import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../../../../services/sale/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-sale',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-sale.component.html',
  styleUrl: './register-sale.component.css'
})
export class RegisterSaleComponent implements OnInit {

  registerForm!: FormGroup;
  registerError: string = "";
  canRegister: boolean = false; // Variable para controlar el registro

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _apiSale: SaleService,
  ){
    // this.registerForm=this.formBuilder.group({
    //   productname:['',
    //     [
    //       Validators.required
    //     ]
    //   ],
    //   amount: ['', 
    //     [
    //       Validators.required
    //     ]
    //   ],
    //   price: ['', []],
    // })
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
    
    //agregar el primer producto al formulario
    this.addProduct();
  }

  //getter para acceder al formarray
  get products(): FormArray {
    return this.registerForm.get('products') as FormArray;
  }

  // Método para agregar un nuevo producto al FormArray
  addProduct(): void {
    const productGroup = this.formBuilder.group({
      productname: ['', Validators.required], // Nombre del producto
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Cantidad (solo números)
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Precio (número con decimales)
      total: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]] // Total (número con decimales)
    });

    this.products.push(productGroup);
  }

  // Método para registrar la venta
  register(): void {
    if (this.registerForm.valid) {
      console.log('Formulario enviado:', this.registerForm.value);
      // Aquí puedes enviar los datos al backend
    } else {
      console.error('Formulario inválido');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Bloquear caracteres no numéricos
    }
  }

  get productname() {
    return this.registerForm.get('productname');
  }
  get amount() {
    return this.registerForm.get('amount');
  }
  get price() {
    return this.registerForm.get('price');
  }
}
