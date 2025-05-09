import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../../../../services/sale/sale.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
    private http: HttpClient,
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

  // Método para agregar un nuevo producto al FormArray
  addProduct(): void {
    const productGroup = this.formBuilder.group({
      productname: [''], // Nombre del producto
      amount: [''], // Cantidad (solo números)
      price: [''], //solo lectura
      total: [''] // solo lectura
    });

    // Detectar cambios en los campos productname y amount
    productGroup.valueChanges
    .pipe(
      debounceTime(2000), // Esperar 2 segundos después de que el usuario deje de escribir
      distinctUntilChanged() // Evitar llamadas repetidas si los valores no cambian
    )
    .subscribe((values) => {
      const { productname, amount } = values;
      if (productname && amount) { // si ambos están presentes
        this.fetchPriceAndTotal(productname, amount, productGroup);
      }
    });

    

    this.products.push(productGroup);
  }

  //getter para acceder al formarray
  get products(): FormArray {
    // return this.registerForm.get('products') as FormArray;
    return this.registerForm.get('products') as FormArray;
  }

  // Método para consultar el precio y total desde el backend
  fetchPriceAndTotal(productname: string, amount: string, productGroup: FormGroup): void {

    this._apiSale.getSalePriceByProductAmount(productname, Number(amount)).subscribe({
      next: (data) => {
        productGroup.patchValue({
          price: data.unitPrice,
          total: data.totalPrice
        });
      },
      error: (err) => {
        console.error('Error al obtener el precio y total:', err);
      }
    });
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




}
