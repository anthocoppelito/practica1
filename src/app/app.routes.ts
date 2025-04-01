import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CajeroComponent } from './pages/cajero/cajero.component';
import { BodegaComponent } from './pages/bodega/bodega.component';
import { TestComponent } from './components/tests/test/test.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AccesoDenegadoComponent } from './components/public/acceso-denegado/acceso-denegado.component';

export const routes: Routes = [
    {path: 'inicio', component: DashboardComponent, canActivate: [authGuard]}, // Ruta protegida por login
    {path: 'login', component: LoginComponent},
    {path: 'access-denied', component: AccesoDenegadoComponent},
    {path: 'admin', component: AdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]}, // Ruta protegida por rol
    {path: 'cajero', component: CajeroComponent, canActivate: [authGuard, () => roleGuard(['CAJERO','ADMIN'])]},
    {path: 'bodega', component: BodegaComponent, canActivate: [authGuard, () => roleGuard(['BODEGA','ADMIN'])]},
    {path: 'test', component: TestComponent},
    // si no insertas alguna ruta definada, te redirige a inicio
    {path: '**', redirectTo: '/inicio', pathMatch: 'full'} 
];
