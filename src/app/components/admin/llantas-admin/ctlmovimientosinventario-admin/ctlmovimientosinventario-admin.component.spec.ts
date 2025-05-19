import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlmovimientosinventarioAdminComponent } from './ctlmovimientosinventario-admin.component';

describe('CtlmovimientosinventarioAdminComponent', () => {
  let component: CtlmovimientosinventarioAdminComponent;
  let fixture: ComponentFixture<CtlmovimientosinventarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtlmovimientosinventarioAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtlmovimientosinventarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
