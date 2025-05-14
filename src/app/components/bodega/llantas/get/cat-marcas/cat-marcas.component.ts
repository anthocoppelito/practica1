import { Component, OnInit } from '@angular/core';
import { CatMarcasService } from '../../../../../services/llanta/cat_marcas/cat-marcas.service';
import { Router } from '@angular/router';
import { Marcas } from '../../../../../services/llanta/cat_marcas/marcas';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-marcas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cat-marcas.component.html',
  styleUrl: './cat-marcas.component.css'
})
export class CatMarcasComponent implements OnInit {
  marcaForm!: FormGroup;
  
  editar(arg0: number) {
  throw new Error('Method not implemented.');
  }

  marcas: Marcas[] = []; // Lista de marcas

  constructor(
    private catMarcasService: CatMarcasService,
    private router: Router,
    private fb: FormBuilder
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
    this.marcaForm = this.fb.group({
      nomMarcas: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalMarca');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.marcaForm.reset();
      });
    }
  }

  registrarMarca() {
    if (this.marcaForm.valid) {
      this.catMarcasService.register(this.marcaForm.value).subscribe({
        next: () => {
          // Cierra el modal manualmente con Bootstrap JS
          const modal = document.getElementById('modalMarca');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.marcaForm.reset();
          // Recarga la lista de marcas si es necesario
        },
        error: (err) => {
          // Maneja el error
        }
      });
    }
  }
}
