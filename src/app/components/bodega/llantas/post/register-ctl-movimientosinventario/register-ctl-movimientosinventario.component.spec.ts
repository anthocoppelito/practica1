import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCtlMovimientosinventarioComponent } from './register-ctl-movimientosinventario.component';

describe('RegisterCtlMovimientosinventarioComponent', () => {
  let component: RegisterCtlMovimientosinventarioComponent;
  let fixture: ComponentFixture<RegisterCtlMovimientosinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCtlMovimientosinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCtlMovimientosinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
