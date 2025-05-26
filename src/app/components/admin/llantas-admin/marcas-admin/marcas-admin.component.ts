import { Component, OnInit, ViewChild } from '@angular/core';
import { CatMarcasComponent } from "../../../bodega/llantas/get/cat-marcas/cat-marcas.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatMarcasService } from '../../../../services/llanta/cat_marcas/cat-marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas-admin',
  standalone: true,
  imports: [CatMarcasComponent, ReactiveFormsModule],
  templateUrl: './marcas-admin.component.html',
  styleUrl: './marcas-admin.component.css'
})
export class MarcasAdminComponent implements OnInit {

  @ViewChild(CatMarcasComponent) catMarcasComp!: CatMarcasComponent;
  marcaForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private  catMarcasService: CatMarcasService
  ) {}


  ngOnInit(): void {
    this.marcaForm = this.fb.group({
      nomMarcas: ['', Validators.required]
    });
  }

  registrarMarca() {
    if (this.marcaForm.valid) {
      this.catMarcasService.register(this.marcaForm.value).subscribe({
        next: () => {
          this.marcaForm.reset();
          // Llama al método para recargar la lista en el componente hijo
          if (this.catMarcasComp) {
            this.catMarcasComp.recargarMarcas();
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
