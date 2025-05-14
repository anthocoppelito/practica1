import { Component, OnInit } from '@angular/core';
import { Modelos } from '../../../../../services/llanta/cat_modelos/modelos';
import { CatModelosService } from '../../../../../services/llanta/cat_modelos/cat-modelos.service';

@Component({
  selector: 'app-cat-modelos',
  standalone: true,
  imports: [],
  templateUrl: './cat-modelos.component.html',
  styleUrl: './cat-modelos.component.css'
})
export class CatModelosComponent implements OnInit {
editar(arg0: number) {
throw new Error('Method not implemented.');
}

  modelos: Modelos[] = []; // Lista de modelos

  constructor(
    private catModelosService: CatModelosService,
  ) { }
  ngOnInit(): void {
    this.catModelosService.getAllModels().subscribe({
      next: (data) => {
        this.modelos = data; // Asignar los modelos a la variable
      },
      error: (err) => {
        console.error('Error al obtener los modelos:', err);
      }
    })
  }

}
