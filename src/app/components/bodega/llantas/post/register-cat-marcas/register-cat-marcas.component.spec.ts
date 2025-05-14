import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCatMarcasComponent } from './register-cat-marcas.component';

describe('RegisterCatMarcasComponent', () => {
  let component: RegisterCatMarcasComponent;
  let fixture: ComponentFixture<RegisterCatMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCatMarcasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCatMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
