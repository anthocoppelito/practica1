import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string ="";


  

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService){
    this.loginForm= this.formBuilder.group({
      username:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email(){
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login(){
    if (this.loginForm.valid) { // Valida que los validators sean true
      console.log("Validaciones exitosas");
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          console.log("Token recibido:", response.token);
          this.authService.saveToken(response.token); // Guardar el token en localStorage
          this.router.navigate(['/inicio']); // Redirigir a la página de inicio
        },
        error: (error) => {
          console.error("Error en el login:", error);
          this.loginError = "Credenciales incorrectas. Inténtalo de nuevo.";
        },
        complete: () => {
          console.info("Login completo");
          this.loginForm.reset();
        }
      });
    } else {
      // Marca todas como tocadas
      this.loginForm.markAllAsTouched();
      alert("Los datos ingresados no son válidos");
    }
  }

}

// es importante poner ! en el loginform para que diga que no sera vacio