import { Component, OnInit, ViewChild } from '@angular/core';
import { CatMovimientosinventarioComponent } from "../../../bodega/llantas/get/cat-movimientosinventario/cat-movimientosinventario.component";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatMovimientosinventarioService } from '../../../../services/llanta/cat_movimientosinventario/cat-movimientosinventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientosinventario-admin',
  standalone: true,
  imports: [CatMovimientosinventarioComponent, ReactiveFormsModule],
  templateUrl: './movimientosinventario-admin.component.html',
  styleUrl: './movimientosinventario-admin.component.css'
})
export class MovimientosinventarioAdminComponent implements OnInit{

  @ViewChild(CatMovimientosinventarioComponent) catMovimientosinventarioComp!: CatMovimientosinventarioComponent;
  movimientosInventarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catMovimientosinventarioService: CatMovimientosinventarioService
  ) {}

  ngOnInit(): void {
    this.movimientosInventarioForm = this.fb.group({
      nomMovimientoinventario: ['', Validators.required]
    });
  }

  registrar(){
    if (this.movimientosInventarioForm.valid) {
      this.catMovimientosinventarioService.register(this.movimientosInventarioForm.value).subscribe({
        next: () => {
          this.movimientosInventarioForm.reset();
          // Llama al método para recargar la lista en el componente hijo
          if (this.catMovimientosinventarioComp) {
            this.catMovimientosinventarioComp.recargar();
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar la marca',
            text: err.error || 'Ocurrió un error al registrar la marca.'
         })
          
        }
      });
    }
  }

}
