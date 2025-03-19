import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;


  

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.loginForm= this.formBuilder.group({
      email:['admin@coppel.com',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log("Ingreso exitoso")
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
      
      
    }else{
      alert("Los datos ingresados no son validos")
    }
  }
}

// es importante poner ! en el loginform para que diga que no sera vacio