import { Component, OnInit } from '@angular/core';
import { InventarioLlantas } from '../../../../../services/llanta/ctl_inventariollantas/inventariollantas';
import { CtlInventariollantasService } from '../../../../../services/llanta/ctl_inventariollantas/ctl-inventariollantas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Marcas } from '../../../../../services/llanta/cat_marcas/marcas';
import { CatMarcasService } from '../../../../../services/llanta/cat_marcas/cat-marcas.service';
import { CatModelosService } from '../../../../../services/llanta/cat_modelos/cat-modelos.service';
import { CatRinesService } from '../../../../../services/llanta/cat_rines/cat-rines.service';
import { Modelos } from '../../../../../services/llanta/cat_modelos/modelos';
import { Rines } from '../../../../../services/llanta/cat_rines/rines';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventarioLlantasEdit } from '../../../../../services/llanta/ctl_inventariollantas/inventariollantasEdit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ctl-inventariollantas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ctl-inventariollantas.component.html',
  styleUrl: './ctl-inventariollantas.component.css'
})
export class CtlInventariollantasComponent implements OnInit {




  inventarioLlantasForm!: FormGroup;

  llantas: InventarioLlantas[] = []; // Lista de llantas
  marcas: Marcas[] = []; // Lista de marcas
  modelos: Modelos[] = []; // Lista de modelos
  rines: Rines[] = []; // Lista de rines

  //modal de ventas
  agregarVentaForm!: FormGroup;
  llantaSeleccionada: any = null;
  stockStatus: 'ok' | 'error' | '' = '';
  listaVenta: { id: number, cantidad: number }[] = [];

  //modal de editar llanta
  editarLlantaForm!: FormGroup;

  //modal de stock
  stockForm!: FormGroup;


  //que bodega no pueda vender
  esPaginaBodega = false;

  // metodos de ventas
  abrirModalAgregar(llanta: any) {
    this.llantaSeleccionada = llanta;
    this.stockStatus = '';
    this.agregarVentaForm.reset();
    // Abre el modal con Bootstrap JS
    const modal = document.getElementById('modalAgregarVenta');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  

  confirmarEditarLlanta() {
  if (this.editarLlantaForm.valid) {
    const datos = this.editarLlantaForm.value;
    this.inventarioLlantasService.edit(datos).subscribe({
      next: () => {
        // Cierra el modal
        const modal = document.getElementById('modalEditarLlanta');
        if (modal) {
          (window as any).bootstrap.Modal.getInstance(modal).hide();
        }
        // Recarga la lista de llantas
        this.cargarLlantas();
      },
      error: (err) => {
        // Maneja el error
      }
    });
  }
}


  verificarStock(cantidad: number) {
    if (!this.llantaSeleccionada) return;
    if (cantidad > 0 && cantidad <= this.llantaSeleccionada.num_existencia) {
      this.stockStatus = 'ok';
    } else if (cantidad > this.llantaSeleccionada.num_existencia) {
      this.stockStatus = 'error';
    } else {
      this.stockStatus = '';
    }
  }

  confirmarAgregarVenta() {
    if (this.stockStatus !== 'ok') return;
    const id = this.llantaSeleccionada.idLlanta;
    const cantidad = this.agregarVentaForm.value.cantidad;
    // Leer lista actual
    let lista = JSON.parse(localStorage.getItem('llantasParaVenta') || '[]');
    // Evitar duplicados, pero permitir actualizar cantidad
    const idx = lista.findIndex((item: any) => item.id === id);
    if (idx === -1) {
      lista.push({ id, cantidad });
    } else {
      lista[idx].cantidad = cantidad; // Actualiza cantidad si ya existe
    }
    localStorage.setItem('llantasParaVenta', JSON.stringify(lista));
    // Cierra el modal
    const modal = document.getElementById('modalAgregarVenta');
    if (modal) {
      (window as any).bootstrap.Modal.getInstance(modal).hide();
    }
  }





  constructor(
    private inventarioLlantasService: CtlInventariollantasService,
    private marcasService: CatMarcasService,
    private modeloService: CatModelosService,
    private rinesService: CatRinesService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.esPaginaBodega = this.router.url === '/bodega';

    this.cargarLlantas();
  
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

    //agregarVentaForm
    this.agregarVentaForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });

    // Detectar cambios en cantidad y verificar stock
    this.agregarVentaForm.get('cantidad')!.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(cantidad => {
        this.verificarStock(cantidad);
      });

      //creacion de formulario para editar llanta
    this.editarLlantaForm = this.fb.group({
      idLlanta: ['', Validators.required],
      idMarca: ['', Validators.required],
      idModelo: ['', Validators.required],
      idRin: ['', Validators.required],
      numPreciobasico: ['', [Validators.required, Validators.min(0)]],
      numExistencia: ['', [Validators.required, Validators.min(0)]]
    });
    // Limpia el formulario cuando el modal se cierra
    const modalEditar = document.getElementById('modalEditarLlanta');
    if (modalEditar) {
      modalEditar.addEventListener('hidden.bs.modal', () => {
        this.editarLlantaForm.reset();
      });
    }


    //creacion de formulario para stock
    this.stockForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(0)]]
    });
    // Limpia el formulario cuando el modal se cierra
    const modalStock = document.getElementById('modalAgregarStock');
    if (modalStock) {
      modalStock.addEventListener('hidden.bs.modal', () => {
        this.stockForm.reset();
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
          this.cargarLlantas();
          // this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
          //   next: (data) => {
          //     this.llantas = data; // Asignar las llantas a la variable
          //   },
          //   error: (err) => {
          //     console.error('Error al obtener las llantas:', err);
          //   }
          // });
        },
        error: (err) => {
          console.error('Error al registrar la llanta:', err);
        }
      });
    }
  }

  //obtener busqueda de usuarios segun la busqueda
  buscar(busqueda: string){
    if (busqueda=="" || busqueda =="*"){//buscar por todos
      this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
      next: (data) => {
        this.llantas = data; // Asignar las llantas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las llantas:', err);
      }
    })
    }else{
      this.inventarioLlantasService.getLlantasbySearch(busqueda).subscribe({
        next: (data) => {
          this.llantas = data;
        },
        error: (err) => {
          console.error('Error al obtener los usuarios:', err);
        },
      });

    }
  }

  cargarLlantas(){
    this.inventarioLlantasService.getAllInventarioLlanta().subscribe({
      next: (data) => {
        this.llantas = data; // Asignar las llantas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las llantas:', err);
      }
    });
  }

  //metodo de editar llanta
  abrirModalEditar(llanta: InventarioLlantas) {
    this.editarLlantaForm.patchValue({
      idLlanta: llanta.idLlanta,
      idMarca: llanta.marca?.idMarca,
      idModelo: llanta.modelo?.idModelo,
      idRin: llanta.rines?.idRin,
      numPreciobasico: llanta.num_preciobasico,
      numExistencia: llanta.num_existencia
    });

    // Abre el modal con Bootstrap JS
    const modal = document.getElementById('modalEditarLlanta');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  eliminarLlanta(idllanta: number) {
    this.inventarioLlantasService.delete(idllanta).subscribe({
      next: () => {
        // Éxito
        Swal.fire('Eliminado', 'La llanta fue eliminada correctamente.', 'success');
        this.cargarLlantas();
      },
      error: (err) => {
        // Error
        if (
          err.status === 500 &&
          err.error &&
          err.error.includes('violates foreign key constraint')
        ) {
          Swal.fire(
            'No se puede eliminar',
            'Esta llanta está siendo utilizada en otra tabla y no puede ser eliminada.',
            'error'
          );
        } else {
          Swal.fire('Error', 'Ocurrió un error al eliminar la llanta.', 'error');
        }
        }
    });
  }

  //abrir modal de stock
  abrirModalStock(llanta: InventarioLlantas) {
    this.llantaSeleccionada = llanta;
    this.stockForm.patchValue({
      cantidad: [''] // Prellena con la cantidad actual
    });

    // Abre el modal con Bootstrap JS
    const modal = document.getElementById('modalStock');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  agregarStock(id: number) {
    const cantidad = this.stockForm.value.cantidad;
    this.inventarioLlantasService.addStock(id, cantidad).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Stock agregado correctamente.', 'success');
        this.cargarLlantas();
      },
      error: (err) => {
        Swal.fire('Error', 'Ocurrió un error al agregar el stock.', 'error');
      }
    });
  }

  removerStock(id: number) {
    const cantidad = this.stockForm.value.cantidad;
    this.inventarioLlantasService.removeStock(id, cantidad).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Stock removido correctamente.', 'success');
        this.cargarLlantas();
      },
      error: (err) => {
        Swal.fire('Error', 'Ocurrió un error al remover el stock.', 'error');
      }
    });
  }
}
