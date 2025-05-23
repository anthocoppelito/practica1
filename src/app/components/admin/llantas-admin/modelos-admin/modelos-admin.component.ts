import { Component, OnInit, ViewChild } from '@angular/core';
import { CatModelosComponent } from "../../../bodega/llantas/get/cat-modelos/cat-modelos.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatModelosService } from '../../../../services/llanta/cat_modelos/cat-modelos.service';

@Component({
  selector: 'app-modelos-admin',
  standalone: true,
  imports: [CatModelosComponent, ReactiveFormsModule],
  templateUrl: './modelos-admin.component.html',
  styleUrl: './modelos-admin.component.css'
})
export class ModelosAdminComponent implements OnInit {

  @ViewChild(CatModelosComponent) catModelosComp!: CatModelosComponent;
  modeloForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catModelosService: CatModelosService) 
    {}

  ngOnInit(): void {
    this.modeloForm = this.fb.group({
      nomModelos: ['']
    });
  }

  registrarModelo() {
    if (this.modeloForm.valid) {
      this.catModelosService.register(this.modeloForm.value).subscribe({
        next: () => {
          this.modeloForm.reset();
          // Aquí puedes recargar la lista si lo necesitas
          if (this.catModelosComp) {
            this.catModelosComp.recargarModelos();
          }
        },
        error: (err) => {
          // Maneja el error
        }
      });
    }
  }

}
