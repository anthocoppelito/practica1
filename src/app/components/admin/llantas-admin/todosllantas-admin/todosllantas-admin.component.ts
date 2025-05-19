import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatMarcasComponent } from "../../../bodega/llantas/get/cat-marcas/cat-marcas.component";
import { CatModelosComponent } from "../../../bodega/llantas/get/cat-modelos/cat-modelos.component";
import { CatMovimientosinventarioComponent } from "../../../bodega/llantas/get/cat-movimientosinventario/cat-movimientosinventario.component";
import { CatRinesComponent } from "../../../bodega/llantas/get/cat-rines/cat-rines.component";
import { CtlInventariollantasComponent } from "../../../bodega/llantas/get/ctl-inventariollantas/ctl-inventariollantas.component";
import { CtlMovimientosinventarioComponent } from "../../../bodega/llantas/get/ctl-movimientosinventario/ctl-movimientosinventario.component";

@Component({
  selector: 'app-todosllantas-admin',
  standalone: true,
  imports: [FormsModule, CatMarcasComponent, CatModelosComponent, CatMovimientosinventarioComponent, CatRinesComponent, CtlInventariollantasComponent, CtlMovimientosinventarioComponent],
  templateUrl: './todosllantas-admin.component.html',
  styleUrl: './todosllantas-admin.component.css'
})
export class TodosllantasAdminComponent {
  selectedCard: string = 'todos'; // valores: 'todos', 'marca', 'modelo', 'categoria', 'rines', 'inventario', 'control'

}
