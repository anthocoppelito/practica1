import { Component, OnInit } from '@angular/core';
import { Rines } from '../../../../../services/llanta/cat_rines/rines';
import { CatRinesService } from '../../../../../services/llanta/cat_rines/cat-rines.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-rines',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cat-rines.component.html',
  styleUrl: './cat-rines.component.css'
})
export class CatRinesComponent implements OnInit {

  rinForm!: FormGroup;

  rin: Rines[] = []; // Lista de rines

  editando: boolean = false;
  rinEditandoId: number | null = null;

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
      if (this.editando && this.rinEditandoId !== null) {
        // Editar rin
        this.catRinesService.edit(
          this.rinEditandoId,
          this.rinForm.value.nomRin
        ).subscribe({
          next: () => {
            this.cerrarModalYRecargar();
          },
          error: (err) => {
            //maneja el error
          }
        });
      } else {
        //registrar nuevo rin
        this.catRinesService.register(this.rinForm.value).subscribe({
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
    const modal = document.getElementById('modalRines');
    if (modal) {
      (window as any).bootstrap.Modal.getInstance(modal).hide();
    }
    this.rinForm.reset();
    this.editando = false;
    this.rinEditandoId = null;
    //Recarga la lista de rines
    this.catRinesService.getAllRines().subscribe({
      next: (data) => {
        this.rin = data; // Asignar los rines a la variable
      },
      error: (err) => {
        console.error('Error al obtener los rines:', err);
      }
    });
  }

  borrar(idRin: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catRinesService.delete(idRin).subscribe({
          next: () => {
            //Recarga la lista de rines
            this.catRinesService.getAllRines().subscribe({
              next: (data) => {
                this.rin = data; // Asignar los rines a la variable
              },
              error: (err) => {
                console.error('Error al obtener los rines:', err);
              }
            });
            Swal.fire('Eliminado!', 'El rin ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar el rin:', err);
            Swal.fire('Error', 'No se pudo eliminar el rin.', 'error');
          }
        });
      }
    });
  }

  editar(idRin: number) {
    const rin = this.rin.find(r => r.idRin === idRin);
    if (rin) {
      this.editando = true;
      this.rinEditandoId = idRin;
      this.rinForm.patchValue({
        nomRin: rin.nomRin
      });
      // Abre el modal
      const modal = document.getElementById('modalRines');
      if (modal) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
      }
    }
  }

  recargarRines() {
    this.catRinesService.getAllRines().subscribe({
      next: (data) => {
        this.rin = data; // Asignar los rines a la variable
      },
      error: (err) => {
        console.error('Error al obtener los rines:', err);
      }
    });
  }

}
