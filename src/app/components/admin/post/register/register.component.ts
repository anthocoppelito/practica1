import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';

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


  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private _apiUser: UserService
  ){
      this.registerForm= this.formBuilder.group({
        username:['',[Validators.required, Validators.email]],
        password: ['', Validators.required],
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        country: ['', Validators.required],
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
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            console.log("Usuario registrado:", response);
          },
          error: (error) => {
            console.error("Error en el registro:", error);
            this.registerError = "Error al registrar el usuario. Inténtalo de nuevo.";
          },
          complete: () => {
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
      } else {
        // Marca todas como tocadas
        this.registerForm.markAllAsTouched();
        alert("Los datos ingresados no son válidos");
      }
    }


}
