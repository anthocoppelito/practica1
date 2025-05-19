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
import { UserDetailComponent } from './components/admin/get/user-detail/user-detail.component';
import { RegisterComponent } from './components/admin/post/register/register.component';
import { RegisterProductComponent } from './components/bodega/post/register-product/register-product.component';
import { SalesDetailComponent } from './components/cajero/get/sales-detail/sales-detail.component';
import { RegisterSaleComponent } from './components/cajero/post/register-sale/register-sale.component';
import { CatMarcasComponent } from './components/bodega/llantas/get/cat-marcas/cat-marcas.component';
import { CatModelosComponent } from './components/bodega/llantas/get/cat-modelos/cat-modelos.component';
import { CatRinesComponent } from './components/bodega/llantas/get/cat-rines/cat-rines.component';
import { TodosllantasAdminComponent } from './components/admin/llantas-admin/todosllantas-admin/todosllantas-admin.component';
import { CtlinventariollantasAdminComponent } from './components/admin/llantas-admin/ctlinventariollantas-admin/ctlinventariollantas-admin.component';
import { CtlmovimientosinventarioAdminComponent } from './components/admin/llantas-admin/ctlmovimientosinventario-admin/ctlmovimientosinventario-admin.component';
import { MarcasAdminComponent } from './components/admin/llantas-admin/marcas-admin/marcas-admin.component';
import { ModelosAdminComponent } from './components/admin/llantas-admin/modelos-admin/modelos-admin.component';
import { RinesAdminComponent } from './components/admin/llantas-admin/rines-admin/rines-admin.component';
import { MovimientosinventarioAdminComponent } from './components/admin/llantas-admin/movimientosinventario-admin/movimientosinventario-admin.component';

export const routes: Routes = [
    {path: 'perfil', component: DashboardComponent, canActivate: [authGuard]}, // Ruta protegida por login
    {path: 'login', component: LoginComponent},
    {path: 'access-denied', component: AccesoDenegadoComponent},
    {path: 'admin', component: AdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]}, // Ruta protegida por rol
    {path: 'admin/registrar', component: RegisterComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/marcas', component: MarcasAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/modelos', component: ModelosAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/rines', component: RinesAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/llantas', component: CtlinventariollantasAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/categoria-movimientos-inventario', component: MovimientosinventarioAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/control-movimientos-inventario', component: CtlmovimientosinventarioAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/todos', component: TodosllantasAdminComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'admin/editar/:username', component: UserDetailComponent, canActivate: [authGuard, () => roleGuard(['ADMIN'])]},
    {path: 'cajero', component: CajeroComponent, canActivate: [authGuard, () => roleGuard(['CAJERO','ADMIN'])]},
    {path: 'cajero/registrar', component: RegisterSaleComponent, canActivate: [authGuard, () => roleGuard(['CAJERO','ADMIN'])]},
    {path: 'cajero/detalle/:saleid', component: SalesDetailComponent, canActivate: [authGuard, () => roleGuard(['CAJERO','ADMIN'])]},
    {path: 'bodega', component: BodegaComponent, canActivate: [authGuard, () => roleGuard(['BODEGA','ADMIN'])]},
    {path: 'bodega/registrar', component: RegisterProductComponent, canActivate: [authGuard, () => roleGuard(['BODEGA','ADMIN'])]},
    {path: 'test', component: TestComponent},
    // si no insertas alguna ruta definada, te redirige a inicio
    {path: '**', redirectTo: '/perfil', pathMatch: 'full'} 
];
