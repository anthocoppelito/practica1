import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CajeroComponent } from './pages/cajero/cajero.component';
import { BodegaComponent } from './pages/bodega/bodega.component';

export const routes: Routes = [
    {path: 'inicio', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'cajero', component: CajeroComponent},
    {path: 'bodega', component: BodegaComponent},
    // si no insertas alguna ruta definada, te redirige a inicio
    {path: '**', redirectTo: '/inicio', pathMatch: 'full'} 
];
