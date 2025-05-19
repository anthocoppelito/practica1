import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosinventarioAdminComponent } from './movimientosinventario-admin.component';

describe('MovimientosinventarioAdminComponent', () => {
  let component: MovimientosinventarioAdminComponent;
  let fixture: ComponentFixture<MovimientosinventarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosinventarioAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovimientosinventarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
