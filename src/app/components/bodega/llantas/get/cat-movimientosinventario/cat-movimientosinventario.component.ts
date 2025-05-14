import { Component, OnInit } from '@angular/core';
import { CatMovimientosinventario } from '../../../../../services/llanta/cat_movimientosinventario/catmovimientosinventario';
import { CatMovimientosinventarioService } from '../../../../../services/llanta/cat_movimientosinventario/cat-movimientosinventario.service';

@Component({
  selector: 'app-cat-movimientosinventario',
  standalone: true,
  imports: [],
  templateUrl: './cat-movimientosinventario.component.html',
  styleUrl: './cat-movimientosinventario.component.css'
})
export class CatMovimientosinventarioComponent implements OnInit{

  catMovimientosinventario: CatMovimientosinventario[] = []; // Lista de movimientos de inventario

  constructor(
    private catMovimientosinventarioService: CatMovimientosinventarioService,
  ){}
  ngOnInit(): void {
    this.catMovimientosinventarioService.getAllMovimientosInventario().subscribe({
      next: (data) => {
        this.catMovimientosinventario = data; // Asignar los movimientos de inventario a la variable
      },
      error: (err) => {
        console.error('Error al obtener los movimientos de inventario:', err);
      }
    })
  }

  

}
