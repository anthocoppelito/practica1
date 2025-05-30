import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../../../../services/sale/sale.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import Swal from 'sweetalert2';

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

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
    
    const lista = JSON.parse(localStorage.getItem('llantasParaVenta') || '[]');
    if (lista.length > 0) {
      // Si hay productos en la lista, solo agrega esos
      lista.forEach((item: { id: number, cantidad: number }) => {
        this.addProductConValores(item.id, item.cantidad);
      });
      
      localStorage.removeItem('llantasParaVenta');
    } else {
      // Si no hay productos en la lista, agrega un producto vacío
      this.addProduct();
    }
    // // Suscribirse a cambios en todo el formulario para actualizar localStorage
    // this.products.valueChanges.subscribe((productos: any[]) => {
    //   // Guarda solo id y cantidad
    //   const listaActualizada = productos.map(p => ({
    //     id: p.id,
    //     cantidad: p.amount
    //   }));
    //   localStorage.setItem('llantasParaVenta', JSON.stringify(listaActualizada));
    // });


  }

  // Ejemplo de método para agregar productos con valores iniciales:
  addProductConValores(id: number, cantidad: number) {
    const productGroup = this.formBuilder.group({
      id: [id],
      amount: [cantidad],
      price: [''],
      total: ['']
    });

    // Detectar cambios en los campos productname y amount
    const subscription = productGroup.valueChanges
    .pipe(
      debounceTime(1500), // Esperar 1.5 segundos después de que el usuario deje de escribir
      distinctUntilChanged() // Evitar llamadas repetidas si los valores no cambian
    )
    .subscribe((values) => {
      const { id, amount } = values;
      if (id && amount) { // si ambos están presentes
        this.fetchPriceAndTotal(Number(id), Number(amount), productGroup);
      }
    });
    (productGroup as any)._subscription = subscription;

    this.products.push(productGroup);

    // Llama manualmente la primera vez
    if (id && cantidad) {
      this.fetchPriceAndTotal(Number(id), Number(cantidad), productGroup);
    }
  }

  // Método para agregar un nuevo producto al FormArray9
  addProduct(): void {
    const productGroup = this.formBuilder.group({
      id: [''], // Nombre del producto
      amount: [''], // Cantidad (solo números)
      price: [''], //solo lectura
      total: [''] // solo lectura
    });

    // Detectar cambios en los campos productname y amount
    const subscription = productGroup.valueChanges
    .pipe(
      debounceTime(1500), // Esperar 1.5 segundos después de que el usuario deje de escribir
      distinctUntilChanged() // Evitar llamadas repetidas si los valores no cambian
    )
    .subscribe((values) => {
      const { id, amount } = values;
      if (id && amount) { // si ambos están presentes
        this.fetchPriceAndTotal(Number(id), Number(amount), productGroup);
      }
    });
    (productGroup as any)._subscription = subscription;

    

    this.products.push(productGroup);
  }

  //getter para acceder al formarray
  get products(): FormArray {
    // return this.registerForm.get('products') as FormArray;
    return this.registerForm.get('products') as FormArray;
  }

  // Método para consultar el precio y total desde el backend
  fetchPriceAndTotal(id: number, amount: number, productGroup: FormGroup): void {

    this._apiSale.getSalePriceByProductAmount(Number(id), Number(amount)).subscribe({
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



  // Método para registrar la venta. se envia una lista de productos y su cantidad

  register(): void {
    if (this.registerForm.valid) {

      // Construir el objeto salesList con los datos requeridos
      const salesList = this.products.controls.map(ctrl => ({
        id: Number(ctrl.value.id),
        amount: Number(ctrl.value.amount)
      }));

      // Crear el objeto que espera el backend
      const saleRequest = { salesList };

      // Llamar al servicio para registrar la venta
      this._apiSale.registerSaleLlantas(saleRequest).subscribe({
        next: (response) => {
          // Puedes mostrar un mensaje de éxito o redirigir
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'Se actualizaron los datos.',
            confirmButtonText: 'Aceptar',
            }).then(() => {
              //enviar notificacion de venta registrada
              this._apiSale.notifySaleRegistered();
              localStorage.removeItem('llantasParaVenta'); // Limpiar la lista de productos

              this.router.navigate(['/cajero']);
            })

          console.log('Venta registrada correctamente', response);
          // this.router.navigate(['/ruta-exitosa']);
        },
        error: (err) => {
          this.registerError = 'Error al registrar la venta';
          console.error(err);
        },
        complete: () => {
          console.info('Registro de venta completo');
          this.registerForm.reset(); // Limpiar el formulario después de registrar
        }
      });
      
      


      console.log('Formulario enviado:', this.registerForm.value);
      // Aquí puedes enviar los datos al backend
    } else {
      console.error('Formulario inválido');
    }
    this.clearForm();
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Bloquear caracteres no numéricos
    }
  }
  get totalVenta(): number {
    return this.products.controls
      .map(ctrl => Number(ctrl.value.total) || 0)
      .reduce((acc, curr) => acc + curr, 0);
  }

  // Método para eliminar un producto del FormArray
  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  // Método para limpiar el formulario
  clearForm(): void {
    // Desuscribirse de los cambios de cada FormGroup
    this.products.controls.forEach(ctrl => {
      const sub = (ctrl as any)._subscription;
      if (sub) {
        sub.unsubscribe();
      }
    });
    this.registerForm.reset();
    this.products.clear(); // Limpiar el FormArray
    localStorage.removeItem('llantasParaVenta'); // Limpiar la lista de productos
    //this.addProduct(); // Agregar un nuevo producto vacío
  }




}
