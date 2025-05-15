import { Component, OnInit } from '@angular/core';
import { InventarioLlantas } from '../../../../../services/llanta/ctl_inventariollantas/inventariollantas';
import { CtlInventariollantasService } from '../../../../../services/llanta/ctl_inventariollantas/ctl-inventariollantas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Marcas } from '../../../../../services/llanta/cat_marcas/marcas';
import { CatMarcasService } from '../../../../../services/llanta/cat_marcas/cat-marcas.service';
import { CatModelosService } from '../../../../../services/llanta/cat_modelos/cat-modelos.service';
import { CatRinesService } from '../../../../../services/llanta/cat_rines/cat-rines.service';
import { Modelos } from '../../../../../services/llanta/cat_modelos/modelos';
import { Rines } from '../../../../../services/llanta/cat_rines/rines';

@Component({
  selector: 'app-ctl-inventariollantas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ctl-inventariollantas.component.html',
  styleUrl: './ctl-inventariollantas.component.css'
})
export class CtlInventariollantasComponent implements OnInit {
  inventarioLlantasForm!: FormGroup;

  llantas: InventarioLlantas[] = []; // Lista de llantas
  marcas: Marcas[] = []; // Lista de marcas
  modelos: Modelos[] = []; // Lista de modelos
  rines: Rines[] = []; // Lista de rines

  constructor(
    private inventarioLlantasService: CtlInventariollantasService,
    private marcasService: CatMarcasService,
    private modeloService: CatModelosService,
    private rinesService: CatRinesService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
      next: (data) => {
        this.llantas = data; // Asignar las llantas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las llantas:', err);
      }
    })
    //conseguir las marcas
    this.marcasService.getAllMarcas().subscribe({
      next: (data) => {
        this.marcas = data; // Asignar las marcas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las marcas:', err);
      }
    })
    //conseguir los modelos
    this.modeloService.getAllModels().subscribe({
      next: (data) => {
        this.modelos = data; // Asignar los modelos a la variable
      },
      error: (err) => {
        console.error('Error al obtener los modelos:', err);
      }
    })
    //conseguir los rines
    this.rinesService.getAllRines().subscribe({
      next: (data) => {
        this.rines = data; // Asignar los rines a la variable
      },
      error: (err) => {
        console.error('Error al obtener los rines:', err);
      }
    })
    //creacion de formulario
    this.inventarioLlantasForm = this.fb.group({
      id_marca: [''],
      id_modelo: [''],
      id_rin: [''],
      num_preciobasico: [''],
      num_existencia: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalLlantas');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.inventarioLlantasForm.reset();
      });
    }
  }

  registrarLlanta() {
    if (this.inventarioLlantasForm.valid) {
      this.inventarioLlantasService.register(this.inventarioLlantasForm.value).subscribe({
        next: () => {
          // Cierra el modal manualmente con Bootstrap JS
          const modal = document.getElementById('modalLlantas');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.inventarioLlantasForm.reset();
          this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
            next: (data) => {
              this.llantas = data; // Asignar las llantas a la variable
            },
            error: (err) => {
              console.error('Error al obtener las llantas:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error al registrar la llanta:', err);
        }
      });
    }
  }
}
