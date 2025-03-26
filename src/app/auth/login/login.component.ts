import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

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


  

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService){
    this.loginForm= this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login(){
    if(this.loginForm.valid){//valida que los validators sean true
      console.log("Validaciones exitosas")
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData) => {
            console.log(userData);
        },
        error:(errorData)=>{
          console.error(errorData);
          this.loginError=errorData;
        },
        complete:()=>{
          console.info("Login completo")
          const email = this.loginForm.get('email')?.value;
          if (email === 'admin@coppel.com') {
            this.router.navigate(['/admin']);
          } else if (email === 'cajero@coppel.com') {
            this.router.navigate(['/cajero']);
          } else if (email === 'bodega@coppel.com') {
            this.router.navigate(['/bodega']);
          } else {
            alert("Usuario no válido");
          }
      this.loginForm.reset();
        }
      });
      

      
      
    }else{
      // marca todas como tocadas
      this.loginForm.markAllAsTouched(); 
      alert("Los datos ingresados no son validos")
    }
  }
}

// es importante poner ! en el loginform para que diga que no sera vacio