import { Component, OnInit } from '@angular/core';
import { InventarioLlantas } from '../../../../../services/llanta/ctl_inventariollantas/inventariollantas';
import { CtlInventariollantasService } from '../../../../../services/llanta/ctl_inventariollantas/ctl-inventariollantas.service';

@Component({
  selector: 'app-ctl-inventariollantas',
  standalone: true,
  imports: [],
  templateUrl: './ctl-inventariollantas.component.html',
  styleUrl: './ctl-inventariollantas.component.css'
})
export class CtlInventariollantasComponent implements OnInit {

  llantas: InventarioLlantas[] = []; // Lista de llantas

  constructor(
    private inventarioLlantasService: CtlInventariollantasService,
  ) {}
  ngOnInit(): void {
    this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
      next: (data) => {
        this.llantas = data; // Asignar las llantas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las llantas:', err);
      }
    })
  }

  

}
