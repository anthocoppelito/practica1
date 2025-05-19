import { Component } from '@angular/core';
import { CatMarcasComponent } from "../../../bodega/llantas/get/cat-marcas/cat-marcas.component";

@Component({
  selector: 'app-marcas-admin',
  standalone: true,
  imports: [CatMarcasComponent],
  templateUrl: './marcas-admin.component.html',
  styleUrl: './marcas-admin.component.css'
})
export class MarcasAdminComponent {

}
