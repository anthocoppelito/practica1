import { Component, OnInit } from '@angular/core';
import { Rines } from '../../../../../services/llanta/cat_rines/rines';
import { CatRinesService } from '../../../../../services/llanta/cat_rines/cat-rines.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-rines',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cat-rines.component.html',
  styleUrl: './cat-rines.component.css'
})
export class CatRinesComponent implements OnInit {
  rinForm!: FormGroup;

  rin: Rines[] = []; // Lista de rines
  constructor(
    private catRinesService: CatRinesService,
    private fb: FormBuilder
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
    this.rinForm = this.fb.group({
      nomRin: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalRines');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.rinForm.reset();
      });
    }
  }
  registrarRin() {
    if (this.rinForm.valid) {
      this.catRinesService.register(this.rinForm.value).subscribe({
        next: () => {
          // Cierra el modal manualmente con Bootstrap JS
          const modal = document.getElementById('modalRines');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.rinForm.reset();
          this.catRinesService.getAllRines().subscribe({
            next: (data) => {
              this.rin = data; // Asignar los rines a la variable
            },
            error: (err) => {
              console.error('Error al obtener los rines:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error al registrar el rin:', err);
        }
      });
    }
  }

}
