import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router); // Inyectar el Router
  const token = localStorage.getItem('authToken'); // Verificar si el token existe

  if (token) {
    return true; // Permitir acceso si el token está presente
  } else {
    router.navigate(['/login']); // Redirigir al login si no hay token
    return false;
  }
};

// El AuthGuard es un archivo que se utiliza para proteger rutas en 
// tu aplicación Angular. Por convención, debes colocarlo en una carpeta 
// llamada guards dentro de tu estructura de proyecto. Esto ayuda a 
// mantener el código organizado.

// En Angular 17, el método CanActivate ha sido reemplazado por el 
// nuevo sistema de Route Guards basado en funciones. Esto significa
//  que en lugar de usar clases con CanActivate, ahora puedes definir
//  guards como funciones directamente. Esto hace que al acceder a una
// ruta protegida, te rediriga a cierta ruta
