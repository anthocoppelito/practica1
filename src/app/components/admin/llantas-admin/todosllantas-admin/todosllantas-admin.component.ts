import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatMarcasComponent } from "../../../bodega/llantas/get/cat-marcas/cat-marcas.component";
import { CatModelosComponent } from "../../../bodega/llantas/get/cat-modelos/cat-modelos.component";
import { CatMovimientosinventarioComponent } from "../../../bodega/llantas/get/cat-movimientosinventario/cat-movimientosinventario.component";
import { CatRinesComponent } from "../../../bodega/llantas/get/cat-rines/cat-rines.component";
import { CtlInventariollantasComponent } from "../../../bodega/llantas/get/ctl-inventariollantas/ctl-inventariollantas.component";
import { CtlMovimientosinventarioComponent } from "../../../bodega/llantas/get/ctl-movimientosinventario/ctl-movimientosinventario.component";
import { MarcasAdminComponent } from "../marcas-admin/marcas-admin.component";
import { ModelosAdminComponent } from "../modelos-admin/modelos-admin.component";
import { RinesAdminComponent } from "../rines-admin/rines-admin.component";

@Component({
  selector: 'app-todosllantas-admin',
  standalone: true,
  imports: [FormsModule, CatMarcasComponent, CatModelosComponent, CatMovimientosinventarioComponent, CatRinesComponent, CtlInventariollantasComponent, CtlMovimientosinventarioComponent, MarcasAdminComponent, ModelosAdminComponent, RinesAdminComponent],
  templateUrl: './todosllantas-admin.component.html',
  styleUrl: './todosllantas-admin.component.css'
})
export class TodosllantasAdminComponent {
  selectedCard: string = 'todos'; // valores: 'todos', 'marca', 'modelo', 'categoria', 'rines', 'inventario', 'control'

}
