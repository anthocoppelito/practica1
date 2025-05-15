import { Component, OnInit } from '@angular/core';
import { CatMovimientosinventario } from '../../../../../services/llanta/cat_movimientosinventario/catmovimientosinventario';
import { CatMovimientosinventarioService } from '../../../../../services/llanta/cat_movimientosinventario/cat-movimientosinventario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-movimientosinventario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cat-movimientosinventario.component.html',
  styleUrl: './cat-movimientosinventario.component.css'
})
export class CatMovimientosinventarioComponent implements OnInit{
  catMovimientosinventarioForm!: FormGroup;

  catMovimientosinventario: CatMovimientosinventario[] = []; // Lista de movimientos de inventario

  constructor(
    private catMovimientosinventarioService: CatMovimientosinventarioService,
    private fb: FormBuilder
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
    this.catMovimientosinventarioForm = this.fb.group({
      nomMovimientoinventario: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalMovimientosInventario');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.catMovimientosinventarioForm.reset();
      });
    }
  }
  registrarMovimientosInventario() {
    if (this.catMovimientosinventarioForm.valid) {
      this.catMovimientosinventarioService.register(this.catMovimientosinventarioForm.value).subscribe({
        next: () => {
          // Cierra el modal manualmente con Bootstrap JS
          const modal = document.getElementById('modalCatMovimientosInventario');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.catMovimientosinventarioForm.reset();
          this.catMovimientosinventarioService.getAllMovimientosInventario().subscribe({
            next: (data) => {
              this.catMovimientosinventario = data; // Asignar los movimientos de inventario a la variable
            },
            error: (err) => {
              console.error('Error al obtener los movimientos de inventario:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error al registrar el movimiento de inventario:', err);
        }
      });
    }
  }

  

}
