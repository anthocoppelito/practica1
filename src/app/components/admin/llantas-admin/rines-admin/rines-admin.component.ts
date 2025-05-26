import { Component, OnInit, ViewChild } from '@angular/core';
import { CatRinesComponent } from "../../../bodega/llantas/get/cat-rines/cat-rines.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatRinesService } from '../../../../services/llanta/cat_rines/cat-rines.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rines-admin',
  standalone: true,
  imports: [CatRinesComponent, ReactiveFormsModule],
  templateUrl: './rines-admin.component.html',
  styleUrl: './rines-admin.component.css'
})
export class RinesAdminComponent implements OnInit {

  @ViewChild(CatRinesComponent) catRinesComp!: CatRinesComponent;
  rinForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private catRinesService: CatRinesService
  ) { }
  ngOnInit(): void {
    this.rinForm = this.fb.group({
      nomRin: ['', Validators.required]
    });
  }

  registrarRin() {
    if (this.rinForm.valid) {
      this.catRinesService.register(this.rinForm.value).subscribe({
        next: () => {
          this.rinForm.reset();
          // Aquí puedes recargar la lista si lo necesitas
          if (this.catRinesComp) {
            this.catRinesComp.recargarRines();
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar los rines',
            text: err.error || 'Ocurrió un error al registrar los rines.'
            })
        }
      });
    }
  }





}
