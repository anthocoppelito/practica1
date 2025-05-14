import { Component, OnInit } from '@angular/core';
import { CtlMovimientosinventario } from '../../../../../services/llanta/ctl_movimientosinventario/ctlmovimientosinventario';
import { CtlMovimientosinventarioService } from '../../../../../services/llanta/ctl_movimientosinventario/ctl-movimientosinventario.service';

@Component({
  selector: 'app-ctl-movimientosinventario',
  standalone: true,
  imports: [],
  templateUrl: './ctl-movimientosinventario.component.html',
  styleUrl: './ctl-movimientosinventario.component.css'
})
export class CtlMovimientosinventarioComponent implements OnInit {

  ctlMovimientosInventario: CtlMovimientosinventario[] = []; // Lista de control de movimientos de inventario

  constructor(
    private ctlMovimientosInventarioService: CtlMovimientosinventarioService
  ){}
  ngOnInit(): void {
    this.ctlMovimientosInventarioService.getAllMovimientosInventario().subscribe({
      next: (data) => {
        this.ctlMovimientosInventario = data; // Asignar los movimientos de inventario a la variable
      },
      error: (err) => {
        console.error('Error al obtener los movimientos de inventario:', err);
      }
    })
  }


}
