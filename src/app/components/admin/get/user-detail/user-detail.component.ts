import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../services/auth/user';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})


export class UserDetailComponent implements OnInit {

  // private _route = inject(ActivatedRoute);
  // private _apiUser = inject(UserService);

  public user?: User;
  userForm!: FormGroup;
  userError: string ="";

  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private _route: ActivatedRoute,
    private router: Router,
    private _apiUser: UserService
  ) {
    this.userForm= this.formBuilder.group({
      username:[{ value: '', disabled: true },
        [
          Validators.required, 
          Validators.email
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
      lastname: ['', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ
        ]
      ],
      role: ['', Validators.required],
      country: ['', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Solo letras y espacios y ñÑ
        ]
      ],
    });

    this.titleService.setTitle('Detalles del usuario');

  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._apiUser.getUserbyUsername(params['username']).subscribe((data: User) => {
        this.user = data;
        //rellenamos informacion de usuario actual
        this.userForm.patchValue({
          username: this.user.username,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          role: this.user.role,
          country: this.user.country
        });
        if (this.role.value == 'ADMIN'){
          Swal.fire({
            icon: 'warning',
            title: 'Modificar el rol de un admin puede llevar a un error en el sistema',
            text: 'Si necesitas cambiar el rol de un admin, contacte al soporte del sistema.',
            confirmButtonText: 'Aceptar'
          })
          this.userForm.controls['role'].disable(); // Deshabilitar el campo de rol
        }
        
      })
    });
    this.userForm.markAllAsTouched();
    
  }

  get username(){
    return this.userForm.controls['username'];
  }

  get lastname(){
    return this.userForm.controls['lastname'];
  }

  get firstname(){
    return this.userForm.controls['firstname'];
  }

  get country(){
    return this.userForm.controls['country'];
  }

  get role(){
    return this.userForm.controls['role'];
  }

  editar(){
    this.userForm.markAllAsTouched();
    if (this.userForm.valid){
      //rol
      switch(this.role.value){
        case 'ADMIN':

          Swal.fire({
            icon: 'question',
            title: '¿Estás seguro de cambiar informacion de un  admin?',
            text: 'Recuerda que el rol de admin solo puede ser cambiado por soporte.',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this._apiUser.updateRoleAdmin(this.username.value).subscribe({});
              this.actualizarUser();
              Swal.fire({
                icon: 'success',
                title: 'Datos actualizados',
                text: 'Se actualizaron los datos.',
                confirmButtonText: 'Aceptar',
              }).then(() => {
                this.router.navigate(['/admin']);
              })
              
              

            }else{
              Swal.fire({
                icon: 'error',
                title: 'Datos no aplicados',
                text: 'Los cambios no fueron aplicados.',
                confirmButtonText: 'Aceptar',
              }).then(() => {
                this.router.navigate(['/admin']);
              })
            }
          })
          
          break;
        case 'BODEGA':
          this._apiUser.updateRoleBodega(this.username.value).subscribe({});
          this.actualizarUser();
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'Se actualizaron los datos.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/admin']);
          })
          break;
        case 'CAJERO':
          this._apiUser.updateRoleCajero(this.username.value).subscribe({});
          this.actualizarUser();
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'Se actualizaron los datos.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/admin']);
          })
          break;
        case 'USER':
          this._apiUser.updateRoleUser(this.username.value).subscribe({});
          this.actualizarUser();
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'Se actualizaron los datos.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/admin']);
          })
          break;
        default:
          console.error("Error al asignar el rol");
          break;
      }

      

    }


    

    
  }
  actualizarUser(){
    this._apiUser.updateUser(this.username.value, this.userForm.value).subscribe({});
  }

}