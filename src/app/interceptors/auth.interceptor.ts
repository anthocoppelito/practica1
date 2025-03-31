import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
  const router = inject(Router); // Inyectar el Router
  
  if (token) {
    // Clonar la solicitud y agregar el encabezado Authorization
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('authToken'); // Eliminar el token
        console.log('interceptor: token expiro')
        router.navigate(['/login']); // Redirigir al login
      }
      return throwError(() => error);
    })
  ); 
}