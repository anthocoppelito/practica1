import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../services/auth/loginRequest';
import { AuthService } from '../../services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { emailDomainValidator, invalidCharactersValidator, noSpacesValidator } from './validatorsLogin/validatorsLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string ="";
  captchaToken: string | null = null; // Almacena el token del captcha
  passwordFieldType: string = 'password';


  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authService: AuthService,
    private titleService: Title
  ){
    this.loginForm= this.formBuilder.group({
      username:['',
        [
          Validators.required, 
          Validators.email, 
          Validators.minLength(14),
          Validators.maxLength(32),
          emailDomainValidator('coppel.com'),//validador @algo.com
          invalidCharactersValidator(),
          noSpacesValidator()
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.maxLength(50),

        ]
      ]
    });

    this.titleService.setTitle('Iniciar sesión'); //poner titulo

    // Suscribirse a los cambios en el formulario
    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = ''; // Vaciar loginError al interactuar con el formulario
    });


  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token; // Almacena el token generado por reCAPTCHA
    console.log('Captcha resuelto:', token);
  }

  get email(){
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login(){
    if (this.loginForm.valid && this.captchaToken) { // Valida que los validators sean true
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
      if (!this.captchaToken) {
        //alert("Por favor, completa el captcha. Si no lo visualizas, revisa tu conexión a internet.");
        this.loginError = "Por favor, completa el captcha. Si no lo visualizas, revisa tu conexión a internet.";
      }else{
        //alert("Los datos ingresados no son válidos");
        this.loginError = "Los datos ingresados no son válidos";
      }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}

// es importante poner ! en el loginform para que diga que no sera vacio