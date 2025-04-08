import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';
import Swal from 'sweetalert2';
import { emailDomainValidator, invalidCharactersValidator, noSpacesValidator } from '../../../../auth/login/validatorsLogin/validatorsLogin';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  registerError: string ="";
  canRegister: boolean = false; // Variable para controlar el registro


  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private _apiUser: UserService
  ){
      this.registerForm= this.formBuilder.group({
        username:['',
          [
            Validators.required, 
            Validators.email, 
            Validators.minLength(14), 
            Validators.maxLength(40),
            emailDomainValidator('coppel.com'),
            invalidCharactersValidator(),
            noSpacesValidator()
          ]
        ],
        password: ['', 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]
        ],
        lastname: ['', 
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ y áéíóú
          ]
        ],
        firstname: ['', 
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ y áéíóú
          ]
        ],
        country: ['', 
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ y áéíóú
          ]
        ],
        role: ['', Validators.required]
      })
    }

    get username(){
      return this.registerForm.controls['username'];
    }

    get password(){
      return this.registerForm.controls['password'];
    }

    get lastname(){
      return this.registerForm.controls['lastname'];
    }

    get firstname(){
      return this.registerForm.controls['firstname'];
    }

    get country(){
      return this.registerForm.controls['country'];
    }

    get role(){
      return this.registerForm.controls['role'];
    }

    register(){
      
      if (this.registerForm.valid) { // Valida que los validators sean true
        console.log("Validaciones exitosas");

        //Antes de intentar registrar, verificar que el usuario no exista
        this._apiUser.checkUser(this.username.value).subscribe({
          next: (exists) => {
            if (exists) {
              console.error("El usuario ya existe");
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario ya existe. Intenta con uno diferente',
                confirmButtonText: 'Aceptar'
              });
            } else {
              console.log("Usuario no existe, se puede registrar"); 
              this.canRegister = true; // Permitir el registro
              // AQUI
              
              //AQUI

            }

          },
          error: (error) => {
            console.error("Error al verificar si el usuario existe:", error);
         },
         complete: () => {
          //si no existe, se puede registrar
        if (this.canRegister) {
          this.authService.register(this.registerForm.value).subscribe({
            next: (response) => {
              if (response){
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario registrado',
                  text: 'El usuario se ha añadido exitosamente',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  this.router.navigate(['/admin']);
                });

              }
              console.log("Usuario registrado:", response);
            },
            error: (error) => {
              console.error("Error en el registro:", error);
              this.registerError = "Error al registrar el usuario. Inténtalo de nuevo.";
            },
            complete: () => {
              this.canRegister = false; // Reiniciar la variable para futuros registros
              console.info("Registro completo");
              switch(this.role.value){
                case 'ADMIN':
                  this._apiUser.updateRoleAdmin(this.username.value).subscribe({});
                  break;
                case 'BODEGA':
                  this._apiUser.updateRoleBodega(this.username.value).subscribe({});
                  break;
                case 'CAJERO':
                  this._apiUser.updateRoleCajero(this.username.value).subscribe({});
                  break;
                case 'USER':
                  this._apiUser.updateRoleUser(this.username.value).subscribe({});
                  break;
                default:
                  console.error("Error al asignar el rol");
                  break;
              }
              this.registerForm.reset();
              this.router.navigate(['/admin']);
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
