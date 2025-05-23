import { Component, OnInit } from '@angular/core';
import { Modelos } from '../../../../../services/llanta/cat_modelos/modelos';
import { CatModelosService } from '../../../../../services/llanta/cat_modelos/cat-modelos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-modelos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cat-modelos.component.html',
  styleUrl: './cat-modelos.component.css'
})
export class CatModelosComponent implements OnInit {

  modeloForm!: FormGroup;

  modelos: Modelos[] = []; // Lista de modelos

  editando: boolean = false;
  modeloEditandoId: number | null = null;

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
      if (this.editando && this.modeloEditandoId !== null) {
        // Editar modelo
        this.catModelosService.edit(
          this.modeloEditandoId,
          this.modeloForm.value.nomModelos
        ).subscribe({
          next: () => {
            this.cerrarModalYRecargar();
          },
          error: (err) => {
            //manejar el error
          }
        });
      } else {
        // Registrar nuevo modelo
        this.catModelosService.register(this.modeloForm.value).subscribe({
          next: () => {
            this.cerrarModalYRecargar();
          },
          error: (err) => {
            //maneja el error
          }
        });
      }
    }
  }

    //cerrarModalYRecargar
    cerrarModalYRecargar() {
      // Cierra el modal manualmente con Bootstrap JS
      const modal = document.getElementById('modalModelo');
      if (modal) {
        (window as any).bootstrap.Modal.getInstance(modal).hide();
      }
      this.modeloForm.reset();
      this.editando = false;
      this.modeloEditandoId = null;
      // Recarga la lista de modelos
      this.catModelosService.getAllModels().subscribe({
        next: (data) => {
          this.modelos = data;
        },
        error: (err) => {
          console.error('Error al obtener los modelos:', err);
        }
      });
    }

    borrar(idModelo: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.catModelosService.delete(idModelo).subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                'El modelo ha sido eliminado.',
                'success'
              );
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
              console.error('Error al eliminar el modelo:', err);
            }
          });
        }
      }

      );
    }

    editar(idModelo: number) {
      const modelo = this.modelos.find(m => m.idModelo === idModelo);
      if (modelo) {
        this.editando = true;
        this.modeloEditandoId = idModelo;
        this.modeloForm.patchValue({
          nomModelos: modelo.nomModelos
        });
        // Abre el modal
        const modal = document.getElementById('modalModelo');
        if (modal) {
          (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
        }
      }
    }

    recargarModelos() {
      this.catModelosService.getAllModels().subscribe({
        next: (data) => {
          this.modelos = data; // Recargar la lista de modelos
        },
        error: (err) => {
          console.error('Error al recargar los modelos:', err);
        }
      });
    }      
}
