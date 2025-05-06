import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export class RegisterProductComponent {

    registerForm!: FormGroup;
    registerError: string ="";
    canRegister: boolean = false; // Variable para controlar el registro
  
    constructor(
        private formBuilder: FormBuilder, 
        private router: Router, 
        private _apiProduct: ProductService,
      ){
          this.registerForm= this.formBuilder.group({
            productname:['',
              [
                Validators.required,
                Validators.minLength(3), 
                Validators.maxLength(20),
              ]
            ],
            description: ['', 
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100),
                Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)
              ]
            ],
            category: ['', 
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ y áéíóú
              ]
            ],
            price: ['', 
              [
                Validators.required
              ]
            ],
            stock: ['', 
              [
                Validators.required
              ]
            ]
          })
      }
      get productname(){
        return this.registerForm.get('productname');
      }
  
      get description(){
        return this.registerForm.get('description');
      }
  
      get category(){
        return this.registerForm.get('category');
      } 
  
      get price(){
        return this.registerForm.get('price');
      } 
  
      get stock(){
        return this.registerForm.get('stock');
      }
  
      register(){
            
            if (this.registerForm.valid) { // Valida que los validators sean true
              console.log("Validaciones exitosas");
      
              //Antes de intentar registrar, verificar que el usuario no exista
              this._apiProduct.checkProduct(this.productname?.value).subscribe({
                next: (exists) => {
                  if (exists) {
                    console.error("El producto ya existe");
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Ya existe un producto con ese ID. Intenta con uno diferente',
                      confirmButtonText: 'Aceptar'
                    });
                    this.canRegister = false; // No permitir el registro
                  } else {
                    console.log("Producto no existe, se puede registrar"); 
                    this.canRegister = true; // Permitir el registro
                  }
      
                },
                error: (error) => {
                  console.error("Error al verificar si el producto existe:", error);
               },
               complete: () => {
                //si no existe, se puede registrar
              if (this.canRegister) {
                this._apiProduct.register(this.registerForm.value).subscribe({
                  next: (response) => {
                    if (response){
                      Swal.fire({
                        icon: 'success',
                        title: 'Producto registrado',
                        text: 'El producto se ha añadido exitosamente',
                        confirmButtonText: 'Aceptar'
                      })
                      // .then(() => {
                      //   this.router.navigate(['/bodega']);
                      // });
      
                    }
                    console.log("Producto registrado:", response);
                  },
                  error: (error) => {
                    console.error("Error en el registro:", error);
                    this.registerError = "Error al registrar el prodcuto. Inténtalo de nuevo.";
                  },
                  complete: () => {
                    this.canRegister = false; // Reiniciar la variable para futuros registros
                    console.info("Registro completo");
                    
                    this.registerForm.reset();
                    this.router.navigate(['/bodega']);
                  }
                });
              }
      
      
               }
      
              });
              
      
      
      
      
              
            } else {
              // Marca todas como tocadas
              this.registerForm.markAllAsTouched();
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los datos ingresados no son válidos',
                confirmButtonText: 'Aceptar'
              })
            }
          }
  
  
  

}
