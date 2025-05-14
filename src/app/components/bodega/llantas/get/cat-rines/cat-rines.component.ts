import { Component, OnInit } from '@angular/core';
import { Rines } from '../../../../../services/llanta/cat_rines/rines';
import { CatRinesService } from '../../../../../services/llanta/cat_rines/cat-rines.service';

@Component({
  selector: 'app-cat-rines',
  standalone: true,
  imports: [],
  templateUrl: './cat-rines.component.html',
  styleUrl: './cat-rines.component.css'
})
export class CatRinesComponent implements OnInit {

  rin: Rines[] = []; // Lista de rines
  constructor(
    private catRinesService: CatRinesService,
  ){}
  ngOnInit(): void {
    this.catRinesService.getAllRines().subscribe({
      next: (data) => { 
        this.rin = data; // Asignar los rines a la variable
      },
      error: (err) => {
        console.error('Error al obtener los rines:', err);
      }
    })
  }

}
