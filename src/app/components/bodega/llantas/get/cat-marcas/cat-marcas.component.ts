import { Component, OnInit } from '@angular/core';
import { CatMarcasService } from '../../../../../services/llanta/cat_marcas/cat-marcas.service';
import { Router } from '@angular/router';
import { Marcas } from '../../../../../services/llanta/cat_marcas/marcas';

@Component({
  selector: 'app-cat-marcas',
  standalone: true,
  imports: [],
  templateUrl: './cat-marcas.component.html',
  styleUrl: './cat-marcas.component.css'
})
export class CatMarcasComponent implements OnInit {
editar(arg0: number) {
throw new Error('Method not implemented.');
}

  marcas: Marcas[] = []; // Lista de marcas

  constructor(
    private catMarcasService: CatMarcasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.catMarcasService.getAllMarcas().subscribe({
      next: (data) => {
        this.marcas = data; // Asignar las marcas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las marcas:', err);
      }
    })
  }
}
