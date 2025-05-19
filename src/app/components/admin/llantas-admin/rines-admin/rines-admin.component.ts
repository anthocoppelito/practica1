import { Component } from '@angular/core';
import { CatRinesComponent } from "../../../bodega/llantas/get/cat-rines/cat-rines.component";

@Component({
  selector: 'app-rines-admin',
  standalone: true,
  imports: [CatRinesComponent],
  templateUrl: './rines-admin.component.html',
  styleUrl: './rines-admin.component.css'
})
export class RinesAdminComponent {

}
