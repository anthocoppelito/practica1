import { Component, OnInit } from '@angular/core';
import { CtlMovimientosinventario } from '../../../../../services/llanta/ctl_movimientosinventario/ctlmovimientosinventario';
import { CtlMovimientosinventarioService } from '../../../../../services/llanta/ctl_movimientosinventario/ctl-movimientosinventario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventarioLlantas } from '../../../../../services/llanta/ctl_inventariollantas/inventariollantas';
import { CtlInventariollantasService } from '../../../../../services/llanta/ctl_inventariollantas/ctl-inventariollantas.service';

@Component({
  selector: 'app-ctl-movimientosinventario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ctl-movimientosinventario.component.html',
  styleUrl: './ctl-movimientosinventario.component.css'
})
export class CtlMovimientosinventarioComponent implements OnInit {
  ctlMovimientosinventarioForm!: FormGroup;

  ctlMovimientosInventario: CtlMovimientosinventario[] = []; // Lista de control de movimientos de inventario
  llantas: InventarioLlantas[] = []; // Lista de llantas

  constructor(
    private ctlMovimientosInventarioService: CtlMovimientosinventarioService,
    private ctlInventariollantasService: CtlInventariollantasService,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.ctlMovimientosInventarioService.getAllMovimientosInventario().subscribe({
      next: (data) => {
        this.ctlMovimientosInventario = data; // Asignar los movimientos de inventario a la variable
      },
      error: (err) => {
        console.error('Error al obtener los movimientos de inventario:', err);
      }
    })
    //conseguir todas las llantas
    this.ctlInventariollantasService.getAllInventarioLlanta().subscribe({
      next: (data) => {
        this.llantas = data; // Asignar las llantas a la variable
      },
      error: (err) => {
        console.error('Error al obtener las llantas:', err);
      }
    })
    //formulario
    this.ctlMovimientosinventarioForm = this.fb.group({
      id_llanta: [''],
      num_precio: [''],
      num_empleado: ['']
    });
    // Limpia el formulario cuando el modal se cierra
    const modal = document.getElementById('modalControlInventario');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        this.ctlMovimientosinventarioForm.reset();
      });
    }
  }
  registrarMovimientosInventario() {
    if (this.ctlMovimientosinventarioForm.valid) {
      this.ctlMovimientosInventarioService.register(this.ctlMovimientosinventarioForm.value).subscribe({
        next: () => {
          // Cierra el modal manualmente con Bootstrap JS
          const modal = document.getElementById('modalControlInventario');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
          }
          this.ctlMovimientosinventarioForm.reset();
          this.ctlMovimientosInventarioService.getAllMovimientosInventario().subscribe({
            next: (data) => {
              this.ctlMovimientosInventario = data; // Asignar los movimientos de inventario a la variable
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
