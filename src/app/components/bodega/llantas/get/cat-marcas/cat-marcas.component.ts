import { Component, OnInit } from '@angular/core';
import { CatMarcasService } from '../../../../../services/llanta/cat_marcas/cat-marcas.service';
import { Router } from '@angular/router';
import { Marcas } from '../../../../../services/llanta/cat_marcas/marcas';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-marcas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cat-marcas.component.html',
  styleUrl: './cat-marcas.component.css'
})
export class CatMarcasComponent implements OnInit {
  
  marcaForm!: FormGroup;

  marcas: Marcas[] = []; // Lista de marcas

  editando: boolean = false;
  marcaEditandoId: number | null = null;

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
      if (this.editando && this.marcaEditandoId !== null) {
        // Editar marca
        this.catMarcasService.edit(
          this.marcaEditandoId,
          this.marcaForm.value.nomMarcas
        ).subscribe({
          next: () => {
            this.cerrarModalYRecargar();
          },
          error: (err) => {
            // Maneja el error
          }
        });
      } else {
        // Registrar nueva marca
        this.catMarcasService.register(this.marcaForm.value).subscribe({
          next: () => {
            this.cerrarModalYRecargar();
          },
          error: (err) => {
            // Maneja el error
          }
        });
      }
    }
  }

  cerrarModalYRecargar() {
    // Cierra el modal manualmente con Bootstrap JS
    const modal = document.getElementById('modalMarca');
    if (modal) {
      (window as any).bootstrap.Modal.getInstance(modal).hide();
    }
    this.marcaForm.reset();
    this.editando = false;
    this.marcaEditandoId = null;
    // Recarga la lista de marcas
    this.catMarcasService.getAllMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (err) => {
        console.error('Error al obtener las marcas:', err);
      }
    });
  }

  borrar(idMarca: number) {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la marca.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catMarcasService.delete(idMarca).subscribe({
          next: () => {
            // Recarga la lista de marcas
            this.catMarcasService.getAllMarcas().subscribe({
              next: (data) => {
                this.marcas = data;
              },
              error: (err) => {
                console.error('Error al obtener las marcas:', err);
              }
            });
            Swal.fire('Eliminado', 'La marca ha sido eliminada.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar la marca:', err);
            Swal.fire('Error', 'No se pudo eliminar la marca.', 'error');
          }
        });
      }
    }); 
  }

  editar(idMarca: number) {
    const marca = this.marcas.find(m => m.idMarca === idMarca);
    if (marca) {
      this.editando = true;
      this.marcaEditandoId = idMarca;
      this.marcaForm.patchValue({
        nomMarcas: marca.nomMarcas
      });
      // Abre el modal
      const modal = document.getElementById('modalMarca');
      if (modal) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
      }
    }
  }
  
  recargarMarcas() {
  this.catMarcasService.getAllMarcas().subscribe({
    next: (data) => {
      this.marcas = data;
    },
    error: (err) => {
      console.error('Error al obtener las marcas:', err);
    }
  });
  }

}
