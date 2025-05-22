import { Component, OnInit } from '@angular/core';
import { CatRinesComponent } from "../../../bodega/llantas/get/cat-rines/cat-rines.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatRinesService } from '../../../../services/llanta/cat_rines/cat-rines.service';

@Component({
  selector: 'app-rines-admin',
  standalone: true,
  imports: [CatRinesComponent, ReactiveFormsModule],
  templateUrl: './rines-admin.component.html',
  styleUrl: './rines-admin.component.css'
})
export class RinesAdminComponent implements OnInit {

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
        },
        error: (err) => {
          // Maneja el error
        }
      });
    }
  }





}
