import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; //antes routermodule

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};





// es necesario importar el provideHttpClient para poder usar las apis o conexiones en angular 17
    // { provide: 'urlHost', useValue: 'http://localhost:8080' },// Agregar la URL del backend
    // { provide: 'urlApi', useValue: 'http://localhost:8080/api/v1' },
    // { provide: 'userId', useValue: 1 }
