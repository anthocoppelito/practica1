import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCatMovimientosinventarioComponent } from './register-cat-movimientosinventario.component';

describe('RegisterCatMovimientosinventarioComponent', () => {
  let component: RegisterCatMovimientosinventarioComponent;
  let fixture: ComponentFixture<RegisterCatMovimientosinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCatMovimientosinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCatMovimientosinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
