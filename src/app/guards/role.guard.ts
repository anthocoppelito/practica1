import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

//ahora recibimos un array de roles
export const roleGuard = (expectedRoles: string[]) => {
  const router = inject(Router); // Inyectar el Router
  //const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
  const authService = inject(AuthService); // Inyectar el AuthService
  const userRole = authService.getRoleFromToken(); // Obtener el rol desde el servicio

//si el rol esta incluido en el arreglo, permite acceso
  if (expectedRoles.includes(userRole)) {
    return true; // Permitir acceso si el rol coincide
  } else if (userRole === "null") {
    console.log('guard: token no existente o inválido');
    router.navigate(['/login']); // Redirigir al login si no hay token
    return false;
  } else {
    console.log('guard: rol no autorizado');
    router.navigate(['/access-denied']); // Redirigir si el rol no coincide
    return false;
  }
}