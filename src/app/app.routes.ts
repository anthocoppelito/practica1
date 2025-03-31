import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CajeroComponent } from './pages/cajero/cajero.component';
import { BodegaComponent } from './pages/bodega/bodega.component';
import { TestComponent } from './components/tests/test/test.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'inicio', component: DashboardComponent, canActivate: [authGuard]}, // Ruta protegida
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent, canActivate: [authGuard]},
    {path: 'cajero', component: CajeroComponent, canActivate: [authGuard]},
    {path: 'bodega', component: BodegaComponent, canActivate: [authGuard]},
    {path: 'test', component: TestComponent},
    // si no insertas alguna ruta definada, te redirige a inicio
    {path: '**', redirectTo: '/inicio', pathMatch: 'full'} 
];
