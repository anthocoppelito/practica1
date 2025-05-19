import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioLlantasCajeroComponent } from './inventario-llantas-cajero.component';

describe('InventarioLlantasCajeroComponent', () => {
  let component: InventarioLlantasCajeroComponent;
  let fixture: ComponentFixture<InventarioLlantasCajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioLlantasCajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioLlantasCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
