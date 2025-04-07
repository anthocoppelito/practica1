import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../services/auth/user';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
      username:[{ value: '', disabled: true },[Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', Validators.required],
      country: ['', Validators.required]
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
      })
    });
    if (this.role.value == 'ADMIN'){
      alert("MODIFICAR INFORMACION DE UN ADMIN, PUEDE LLEVAR A UN ERROR EN EL SISTEMA");
    }
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
      this._apiUser.updateUser(this.username.value, this.userForm.value).subscribe({
        next: (response) => {
          switch(this.role.value){
            case 'ADMIN':
              this._apiUser.updateRoleAdmin(this.username.value).subscribe({
                next: (response) => {
                  console.log("Rol de admin actualizado");
                },
                error: (error) => {
                  console.error("Error al actualizar el rol de admin:", error);
                },
                complete: () => {
                  console.info("Rol de admin actualizado correctamente");
                }
              });
              break;
            case 'BODEGA':
              this._apiUser.updateRoleBodega(this.username.value).subscribe({});
              console.log(this.username.value + " " + this.role.value);
              console.log("bodega")
              break;
            case 'CAJERO':
              this._apiUser.updateRoleCajero(this.username.value).subscribe({});
              console.log(this.username.value + " " + this.role.value);
              console.log("cajero")
              break;
            case 'USER':
              this._apiUser.updateRoleUser(this.username.value).subscribe({});
              console.log(this.username.value + " " + this.role.value);
              console.log("user")
              break;
            default:
              console.error("Error al asignar el rol");
              console.log(this.username.value + " " + this.role.value);
              console.log("default")
              break;
          }
          alert("Usuario editado correctamente")
        },
        error: (error) => {
          console.error("Error en el login:", error);
          this.userError = "Credenciales incorrectas. Inténtalo de nuevo.";
        },
        complete: () => {
          console.info("Edicion finalizada");
          this.router.navigate(['/admin']);

          //this.userForm.reset();
        }
      });
    }

    

  }
}