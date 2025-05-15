import { Component, OnInit } from '@angular/core';
import { Modelos } from '../../../../../services/llanta/cat_modelos/modelos';
import { CatModelosService } from '../../../../../services/llanta/cat_modelos/cat-modelos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-modelos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cat-modelos.component.html',
  styleUrl: './cat-modelos.component.css'
})
export class CatModelosComponent implements OnInit {
  modeloForm!: FormGroup;

  
  editar(arg0: number) {
    throw new Error('Method not implemented.');
  }

  modelos: Modelos[] = []; // Lista de modelos

  constructor(
    private catModelosService: CatModelosService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.catModelosService.getAllModels().subscribe({
      next: (data) => {
        this.modelos = data; // Asignar los modelos a la variable
      },
      error: (err) => {
        console.error('Error al obtener los modelos:', err);
      }
    });
    this.modeloForm = this.fb.group({
      nomModelos: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalModelo');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.modeloForm.reset();
      });
    }
  }

  registrarModelo() {
    if (this.modeloForm.valid) {
      this.catModelosService.register(this.modeloForm.value).subscribe({
        next: () => {
          
          const modal = document.getElementById('modalModelo');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.modeloForm.reset();
          this.catModelosService.getAllModels().subscribe({
            next: (data) => {
              this.modelos = data; // Recargar la lista de modelos
            },
            error: (err) => {
              console.error('Error al recargar los modelos:', err);
            }
          });
        },
        error: (err) => {
          // Maneja el error
        }
      });
    }
  }

}
