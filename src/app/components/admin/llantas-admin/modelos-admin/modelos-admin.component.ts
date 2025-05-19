import { Component } from '@angular/core';
import { CatModelosComponent } from "../../../bodega/llantas/get/cat-modelos/cat-modelos.component";

@Component({
  selector: 'app-modelos-admin',
  standalone: true,
  imports: [CatModelosComponent],
  templateUrl: './modelos-admin.component.html',
  styleUrl: './modelos-admin.component.css'
})
export class ModelosAdminComponent {

}
