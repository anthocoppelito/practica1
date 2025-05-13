import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
send() {
  Swal.fire({
    icon: 'warning',
    title: 'Funcionalidad no disponible',
    text: 'Funcionalidad no disponible',
    confirmButtonText: 'Aceptar',
  })
}

}
